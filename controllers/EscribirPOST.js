const Contenido = require('../models/Contenido');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        Logeado = req.session.userId;

        Username=req.session.Username;
//console.log(Logeado,Username)
        // Extract the data from the form
        console.log(req.body)
        const { titulo, Descripcion, tematica, categorias, imagen, texto, video, Miniatura } = req.body;

        let nuevoContenido = {
            titulo,
            Descripcion,
            tematica: new mongoose.Types.ObjectId(tematica),
            categorias: new mongoose.Types.ObjectId(categorias),
            creador: Logeado, // Assuming that the user is authenticated and their ID is available
            creditos: Username, // Assuming that the user has a 'username'
            Miniatura : Miniatura

        };
        
        // Determine what type of content is being added
        if (imagen) {
            nuevoContenido.imagen = imagen;
        } else if (texto) {
            nuevoContenido.texto = texto;
        } else if (video) {
            function convertYouTubeUrlToEmbed(url) {
                var videoId = url.split('v=')[1];
                var ampersandPosition = videoId.indexOf('&');
                if(ampersandPosition !== -1) {
                    videoId = videoId.substring(0, ampersandPosition);
                }
                return 'https://www.youtube.com/embed/' + videoId;
            }
            nuevoContenido.url = convertYouTubeUrlToEmbed(video);
        }
        

        // Create and save the new content in the database
        const contenido = new Contenido(nuevoContenido);
        await contenido.save();

        // Redirect the user or send a response
        res.send(`<script>alert("¡Publicación creada con éxito!"); window.location.href='/';</script>`);
    } catch (error) {
        console.error('Error al crear contenido:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
};
