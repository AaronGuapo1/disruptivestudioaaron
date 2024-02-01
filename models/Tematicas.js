const mongoose = require('mongoose');

const TematicaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    categorias: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }],
    descripcion: String,
    imagenPortada: String, // URL de la imagen

});

const Tematica = mongoose.model('Tematica', TematicaSchema);
module.exports = Tematica;
