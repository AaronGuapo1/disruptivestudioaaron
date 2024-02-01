const Categorias = require('../models/Categorias')

const Tematicas = require('../models/Tematicas')

module.exports = async (req,res)=>{
    const categorias = await Categorias.find({})
    const tematicas = await Tematicas.find({})
    console.log(tematicas)
res.render('PanelCategorias',{categorias,tematicas})
}
/*

*/