const Contenido = require('../models/Contenido');

module.exports = async (req,res)=>{
    try {
        const { titulo, Descripcion } = req.body;
        const contenidoId = req.body.id;
    
        // Update the content in the database
        await Contenido.findByIdAndUpdate(contenidoId, { titulo, Descripcion });
    
        // Redirect to the updated content page or any other desired page
        res.redirect(`/PanelContenido`);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error updating content');
      }
}