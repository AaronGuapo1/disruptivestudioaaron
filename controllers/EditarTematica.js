
const Tematica = require('../models/Tematicas');

module.exports = async (req, res) => {
    try {
        const { nombre, descripcion, imagenPortada, tematicaId, categorias } = req.body;

        // Iterate through each Tematica ID to perform the update
        for (let i = 0; i < tematicaId.length; i++) {
            // Prepare the update object
            let updateData = {
                nombre: nombre[i],
                descripcion: descripcion[i],
                imagenPortada: imagenPortada[i],
            };

            // If categorias is provided, add it to the update object
            // Assuming 'categorias' is already an array of category IDs for each Tematica
            if (categorias && categorias[i]) {
                updateData.categorias = categorias[i].filter(cat => cat); // Remove any falsy values
            }

            // Perform the update operation without manually handling ObjectId conversion
            await Tematica.findByIdAndUpdate(tematicaId[i], updateData);
        }

        res.send(`<script>alert("¡Cambios guardados con éxito!"); window.location.href='/PanelCategorias';</script>`);
    } catch (error) {
        console.error('Error al actualizar temáticas:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
};

