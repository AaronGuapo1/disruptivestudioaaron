const Categorias = require('../models/Categorias');
const Contenido = require('../models/Contenido'); // Asumiendo que tienes un modelo para Contenido

module.exports = async (req, res) => {
    const categorias = await Categorias.find({});

    // Calcular el número de contenidos disponibles para cada categoría
    for (const categoria of categorias) {
        const numContenidos = await Contenido.countDocuments({ categorias: categoria._id });
        categoria.contenidosDisponibles = numContenidos;
    }

    res.render('Categorias', { categorias });
};
