const Contenido = require('../models/Contenido');


module.exports = async (req,res)=>{
    const contenidos = await Contenido.find({})
    res.render('PanelContenido',{contenidos})
}