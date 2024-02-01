const Tematicas = require('../models/Tematicas');

module.exports = async (req, res) => {
    const { nombre, descripcion, imagenPortada } = req.body;
    let { categorias } = req.body;

    // Asegurarse de que 'categorias' sea un array
    if (!Array.isArray(categorias)) {
        categorias = [categorias].filter(Boolean);
    }

    // Filtrar IDs vacíos o no válidos
    const categoriasFiltradas = categorias.filter(id => id.match(/^[0-9a-fA-F]{24}$/));

    try {
        // Comprobar si ya existe una temática con el mismo nombre
        const tematicaExistente = await Tematicas.findOne({ nombre });

        if (tematicaExistente) {
            // Si la temática ya existe, enviar una alerta
            res.send(`<script>alert("La temática ya existe!"); window.location.href='/PanelCategorias';</script>`);
        } else {
            // Si la temática no existe, crearla
            await Tematicas.create({
                nombre,
                categorias: categoriasFiltradas,
                descripcion,
                imagenPortada
            });
            console.log('Temática creada:', req.body);
            res.send(`<script>alert("¡Temática creada con éxito!"); window.location.href='/PanelCategorias';</script>`);
        }
    } catch (error) {
        console.error('Error al crear temática:', error);
        // Manejar el error adecuadamente
        res.status(500).send('Error al procesar la solicitud');
    }
};
