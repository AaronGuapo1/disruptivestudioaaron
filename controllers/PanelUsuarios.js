const Usuario = require('../models/Usuarios')
const path = require('path')

module.exports = async (req,res)=>{
    const usuarios = await Usuario.find({})
res.render('PanelUsuarios',{usuarios})
}
