const Usuario = require('../models/Usuarios.js');

module.exports = async (req, res) => {
    const { Correo, Username } = req.body;

    try {
        // Verificar si el correo o el nombre de usuario ya están registrados
        const usuarioExistente = await Usuario.findOne({ 
            $or: [{ Correo: Correo }, { Username: Username }] 
        });

        if (usuarioExistente) {
            // Si el usuario ya existe, enviar una alerta indicando el problema
            return res.send(`<script>alert("El correo electrónico o nombre de usuario ya están en uso."); window.location.href='/';</script>`);
        }

        // Si no existe, crear el usuario
        await Usuario.create(req.body);
        res.send(`<script>alert("¡Usuario Registrado con éxito!"); window.location.href='/';</script>`);

    } catch (error) {
        console.error(error);
        res.send(`<script>alert("¡Algo salió mal!"); window.location.href='/';</script>`);
    }
};
