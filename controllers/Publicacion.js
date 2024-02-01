const Contenido = require('../models/Contenido')
//const Categoria = require('../models/Categorias')


module.exports = async (req,res)=>{
    const IdContent = req.query.IdContent
    const Publicacion = await Contenido.find({_id:IdContent}).populate('categorias');
    //console.log(Publicacion)
    res.render('Publicacion',{Publicacion})
}