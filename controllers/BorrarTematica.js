const Tematica = require('../models/Tematicas');
const Contenido = require('../models/Contenido');
const Categoria = require('../models/Categorias');

module.exports = async (req, res) => {
    try {
        const tematicaId = req.query.id;

        // Verificar si hay contenidos asociados a esta temática
        const contenidosAsociados = await Contenido.find({ tematica: tematicaId });
        if (contenidosAsociados.length > 0) {
            // Eliminar los contenidos asociados
            await Contenido.deleteMany({ tematica: tematicaId });
        } else if (contenidosAsociados.length < 0){
            return res.send(`<script>alert("¡Hay contenido con esta temática no puedes borrarla!"); window.location.href='/PanelCategorias';</script>`);
        }

        // Eliminar referencias de esta temática en las categorías
        await Categoria.updateMany(
            { tematicas: tematicaId },
            { $pull: { tematicas: tematicaId } }
        );

        // Eliminar la temática
        await Tematica.findByIdAndDelete(tematicaId);

        res.send(`<script>alert("¡Temática eliminada con éxito!"); window.location.href='/PanelCategorias';</script>`);
    } catch (error) {
        console.error('Error al eliminar la temática:', error);
        res.status(500).send(`<script>alert("Error interno del servidor al borrar la temática"); window.location.href='/PanelCategorias';</script>`);
    }
};
