const bcrypt = require('bcrypt')
const Usuario = require('../models/Usuarios')
const path = require('path')

module.exports = async (req, res) => {
  const { Correo, Contraseña } = req.body;
  try {
    const user = await Usuario.findOne({ Correo: Correo  });
    console.log(user)
    if (user) {
      const same = await bcrypt.compare(Contraseña, user.Contraseña);
      if (same) {
        req.session.userId = user._id
        
        req.session.Rol= user.Rol
        req.session.Username = user.Username
        req.session.Correo= user.Correo

        res.send(`<script>alert("¡Sesión iniciado con éxito!"); window.location.href='/';</script>`)

      } else {
        res.send(`<script>alert("¡La contraseña o correo no son correctos!"); window.location.href='/';</script>`)
      }
    } else {
      res.redirect('/')
    }
  } catch (error) {
    console.error(error);
    res.redirect(`/`)
  }
}
