const Usuario = require('../models/Usuarios')

module.exports= async (req,res)=>{
    const IdUsuario = req.body.IdUsuario

await Usuario.updateOne({_id:IdUsuario},{Rol:req.body.Rol})
res.send(`<script>alert("¡Cambios guardados con éxito!"); window.location.href='/PanelUsuarios';</script>`)
    
}