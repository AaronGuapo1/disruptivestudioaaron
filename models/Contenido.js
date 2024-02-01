const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContenidoSchema = new Schema({
  titulo: { type: String, required: true },
  Descripcion:String,
  //tipo: { type: String, required: true, enum: ['imagen', 'video', 'texto'] },
  url: String, // Para videos e imágenes
  texto: String, // Para documentos de texto,
  imagen:String, // Para documentos
  tematica: { type: Schema.Types.ObjectId, ref: 'Tematica', required: true },
  categorias: { type: Schema.Types.ObjectId, ref: 'Categoria' }, // Array de ObjectId referenciando a Categoria
  creador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  creditos: String,
  fechaCreacion: { type: Date, default: Date.now },
  Miniatura:{type:String}
});

const Contenido = mongoose.model('Contenido', ContenidoSchema);
module.exports = Contenido;
