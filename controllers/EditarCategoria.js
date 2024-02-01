const Categoria = require('../models/Categorias'); // Asegúrate de que la ruta del modelo sea correcta

module.exports = async (req, res) => {
    try {
        // Obtener arrays de datos del formulario
        const { categoriaId, nombre, descripcion, imagenPortada } = req.body;
        console.log(req.body)

        // Verificar si los arrays tienen la misma longitud
        if(categoriaId.length === nombre.length && nombre.length === descripcion.length && descripcion.length === imagenPortada.length) {
            // Iterar sobre los arrays y actualizar cada categoría
            for (let i = 0; i < categoriaId.length; i++) {
                await Categoria.findByIdAndUpdate(categoriaId[i], {
                    nombre: nombre[i],
                    descripcion: descripcion[i],
                    imagenPortada: imagenPortada[i]
                });
            }
            res.send(`<script>alert("¡Cambios guardados con éxito!"); window.location.href='/PanelCategorias';</script>`)

        } else {
            throw new Error('Los arrays de datos del formulario no coinciden en longitud.');
        }
    } catch (error) {
        console.error('Error al actualizar categorías:', error);
        res.send(`<script>alert("¡Algo salió mal!"); window.location.href='/PanelCategorias';</script>`)
    }
};
