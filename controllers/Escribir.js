const Contenido = require('../models/Contenido');
const Tematicas = require('../models/Tematicas')
const Categoria = require('../models/Categorias'); // Asegúrate de que la ruta del modelo sea correcta

module.exports = async (req,res)=>{

    const contenido = await Contenido.find({})
    const categorias = await Categoria.find({})
    const tematicas = await Tematicas.find({}).populate('categorias')
    

           // Verificar si el usuario está logeado y tiene rol de 'lector' o 'admin'
           if (Logeado && (Rol === 'creador' || Rol === 'admin')) {
            res.render('Escribir',{contenido,categorias,tematicas})
        } else {
            // Si el usuario no está logeado o no tiene el rol necesario, mostrar mensaje o redirigir
            res.send(`<script>alert("Acceso restringido. Por favor, inicie sesión como creador para subir un contenido."); window.location.href='/';</script>`);
        }

}