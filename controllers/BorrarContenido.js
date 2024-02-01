const Contenido = require('../models/Contenido');

module.exports = async (req,res)=>{
    try {
        const contenidoId = req.query.id; // Asumiendo que el ID se pasa como parámetro en la URL

        // Eliminar el contenido específico
        await Contenido.findByIdAndDelete(contenidoId);

        // Redireccionar a la página donde se listan los contenidos o mostrar un mensaje de éxito
        res.redirect('/PanelContenido'); // Actualiza con la ruta correcta
    } catch (error) {
        console.error('Error al eliminar el contenido:', error);
        res.status(500).send('Error al eliminar el contenido');
    }
}