const Contenido = require('../models/Contenido'); // Modelo de Contenido
const Categoria = require('../models/Categorias'); // Modelo de Categoria
const Tematica = require('../models/Tematicas'); // Modelo de Tematica

module.exports = async (req, res) => {
    try {
        console.log("params",req.query)
        const categoriaId = req.query.id;

        // Verifica si hay contenidos asociados a esta categoría
        const contenidos = await Contenido.find({ categorias: categoriaId });
        if (contenidos.length > 0) {
            // Si hay contenidos asociados, elimínalos
            await Contenido.deleteMany({ categorias: categoriaId });
        }else if (contenidos.length <0){
            res.send(`<script>alert("¡Hay contenido con esta categoria no puedes borrarla!"); window.location.href='/PanelCategorias';</script>`);
        }

        // Elimina la categoría de las temáticas asociadas
        await Tematica.updateMany({}, { $pull: { categorias: categoriaId } });

        // Finalmente, elimina la categoría
        await Categoria.findByIdAndDelete(categoriaId);

        // Redireccionar a la lista de categorías o enviar una confirmación
        res.send(`<script>alert("¡Categoria eliminada con éxito!"); window.location.href='/PanelCategorias';</script>`);

    } catch (error) {
        console.error(error);
        // Enviar una respuesta de error
        res.status(500).send('Error al borrar la categoría');
    }
};
