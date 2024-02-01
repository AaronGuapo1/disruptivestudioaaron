const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser');

const bodyParser = require('body-parser')

// Serve static files from the 'public' directory
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");


global.Logeado = null;
global.Rol = null;
global.Id= 'Id';

const inicio = require('./controllers/inicio');
const RegistrarUsuario = require('./controllers/RegistrarUsuario')
const RegistrarUsuarioPOST = require('./controllers/RegistrarUsuarioPOST')
const Login = require('./controllers/Login')
const LoginPOST = require('./controllers/LoginPOST')
const LogOut = require('./controllers/LogOut')
const Categorias = require('./controllers/Categorias')
const Panel = require('./controllers/Panel')
const PanelCategorias = require('./controllers/PanelCategorias')
const PanelUsuarios = require('./controllers/PanelUsuarios')
const PanelUsuariosPOST = require('./controllers/PanelUsuariosPOST')
const PanelCategoriasPOST = require('./controllers/PanelCategoriasPOST')
const PanelTematicasPOST = require('./controllers/PanelTematicasPOST')
const CategoriaIndividual = require('./controllers/CategoriaIndividual')
const PanelRol = require('./controllers/PanelRol')
const EditarCategoria = require ('./controllers/EditarCategoria')
const EditarTematica = require('./controllers/EditarTematica')
const BorrarCategoria = require('./controllers/BorrarCategoria')
const BorrarTematica = require('./controllers/BorrarTematica')
const Contenido = require('./controllers/Contenido')
const Escribir = require('./controllers/Escribir')
const EscribirPOST = require('./controllers/EscribirPOST')
const Publicacion = require('./controllers/Publicacion')
const PanelContenido = require('./controllers/PanelContenido')
const BorrarContenido = require('./controllers/BorrarContenido')
const EditarContenido = require('./controllers/EditarContenido')

app.use(require('express-session')({ secret: 'AaronGuapo', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
  Logeado = req.session.userId;
  Rol= req.session.Rol;
  Username=req.session.Username;
  Correo=req.session.Correo
  next()
  });
mongoose.connect('mongodb://127.0.0.1:27017/Datos', {useNewUrlParser: true});

app.get("/", inicio);
app.get("/RegistrarUsuario", RegistrarUsuario);
app.post('/RegistrarUsuarioPOST',RegistrarUsuarioPOST)
app.get('/Login',Login)
app.post('/LoginPOST',LoginPOST)
app.get('/LogOut',LogOut)
app.get('/Categorias',Categorias)
app.get('/Panel',Panel)
app.get('/PanelCategorias',PanelCategorias)
app.get('/PanelUsuarios',PanelUsuarios)
app.post('/PanelCategoriasPOST',PanelCategoriasPOST)
app.post('/PanelTematicasPOST',PanelTematicasPOST)
app.post('/PanelUsuariosPOST',PanelUsuariosPOST)
app.get('/CategoriaIndividual/:id',CategoriaIndividual)
app.post('/PanelRol',PanelRol)
app.post('/EditarCategoria',EditarCategoria)
app.post('/EditarTematica',EditarTematica)
app.use('/BorrarCategoria',BorrarCategoria)
app.use('/BorrarTematica',BorrarTematica)
app.use('/Contenido',Contenido)
app.get('/Escribir',Escribir)
app.post('/EscribirPOST',EscribirPOST)
app.use('/Publicacion',Publicacion)
app.get('/PanelContenido',PanelContenido)
app.use('/BorrarContenido',BorrarContenido)
app.post('/EditarContenido',EditarContenido)


app.get('/categoriasPorTematica', async (req, res) => {
    const Tematica = require('./models/Tematicas');

    try {
        const tematicaId = req.query.tematicaId;
        console.log("que es",tematicaId)
        const tematica = await Tematica.findById(tematicaId).populate('categorias');
        res.json(tematica.categorias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
