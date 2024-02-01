const Categorias = require('../models/Categorias');

module.exports = async (req, res) => {
    try {
        // Comprobar si ya existe una categoría con el mismo nombre
        const categoriaExistente = await Categorias.findOne({ nombre: req.body.nombre });

        if (categoriaExistente) {
            // Si la categoría ya existe, enviar una alerta
            res.send(`<script>alert("La categoría ya existe!"); window.location.href='/PanelCategorias';</script>`);
        } else {
            // Si la categoría no existe, crearla
            await Categorias.create(req.body);
            res.send(`<script>alert("¡Categoría creada con éxito!"); window.location.href='/PanelCategorias';</script>`);
        }
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
};
