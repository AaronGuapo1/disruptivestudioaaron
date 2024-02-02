const Contenido = require('../models/Contenido');

module.exports = async (req,res)=>{
    try {
        const { id } = req.query; // Obtiene el id del contenido desde los parámetros de la consulta
        await Contenido.findByIdAndDelete(id); // Elimina el contenido por ID
        res.redirect('/PanelContenido'); // Redirige de vuelta al panel de contenido
    } catch (error) {
        console.error('Error al eliminar el contenido:', error);
        res.status(500).send('Error al eliminar el contenido');
    }
}