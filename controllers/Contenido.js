const Contenido = require('../models/Contenido');

module.exports = async (req, res) => {
    const tematica = req.query.tematica;
    const categoria = req.query.categoria;
    const Logeado = req.session.userId;
    const Rol = req.session.Rol;
    const Username = req.session.Username;
    const Correo = req.session.Correo;

    // Verificar si el usuario está logeado y tiene rol de 'lector' o 'admin'
    if (Logeado && (Rol === 'reader' || Rol === 'admin')) {
        try {
            const contents = await Contenido.find({ tematica: tematica, categorias: categoria })
                .sort({ fechaCreacion: -1 }); // Ordenar por fecha de creación en orden descendente (más reciente primero)
            res.render('Contenido', { contents, Username, Correo });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener el contenido.');
        }
    } else {
        // Si el usuario no está logeado o no tiene el rol necesario, mostrar mensaje o redirigir
        res.send(`<script>alert("Acceso restringido. Por favor, inicie sesión como lector para ver el contenido."); window.location.href='/login';</script>`);
    }
};
