const Categorias = require('../models/Categorias')
const Tematicas = require('../models/Tematicas')

module.exports = async (req, res) => {
    const categoriaId = req.params.id;

    // Buscar temáticas que contienen la categoría especificada
    const tematicas = await Tematicas.find({ categorias: categoriaId });

    // Opcional: Buscar la categoría individual por su ID
    const categoria = await Categorias.findById(categoriaId);
    res.render('CategoriaIndividual', { tematicas, categoria,categoriaId });
}
