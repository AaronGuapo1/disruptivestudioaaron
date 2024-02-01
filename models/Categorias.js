const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: String,
    imagenPortada: String, // URL de la imagen
    Tipo:String,
    /*
    permisosContenidos: {
        permiteImagenes: Boolean,
        permiteVideos: Boolean,
        permiteTextos: Boolean
    }
    */
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports = Categoria;
