const Contenido = require('../models/Contenido');

module.exports = async (req, res) => {
    try {
        const { titulo, Descripcion, id } = req.body; // Asegúrate de que los nombres coincidan con los de tu formulario

        // Comprueba si los arrays tienen la misma longitud para evitar errores
        if (titulo.length === Descripcion.length && titulo.length === id.length) {
            // Itera sobre los arrays y actualiza cada elemento de contenido
            for (let i = 0; i < id.length; i++) {
                await Contenido.findByIdAndUpdate(id[i], {
                    titulo: titulo[i],
                    Descripcion: Descripcion[i]
                });
            }

            // Redirige a la página del panel de contenido con un mensaje de éxito
            res.redirect('/PanelContenido');
        } else {
            // Lanza un error si las longitudes de los arrays no coinciden
            throw new Error('La longitud de los arrays no coincide');
        }
    } catch (error) {
        console.error('Error actualizando el contenido:', error);
        // Envía una respuesta de error al cliente
        res.status(500).send('Error al actualizar el contenido');
    }
};
