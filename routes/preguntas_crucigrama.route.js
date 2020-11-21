var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const preguntaCrucigramaController = require("../controllers/preguntas_crucigrama.controller");


/**
 * rutas **************************************************
*/

router.post('/', preguntaCrucigramaController.crearPreguntaCrucigrama);

router.get('/', preguntaCrucigramaController.getPreguntasCrucigrama);

router.get('/:idPreguntaCrucigrama', preguntaCrucigramaController.getPreguntaCrucigramaById);

router.delete('/:idPreguntaCrucigrama', preguntaCrucigramaController.eliminarPreguntaCrucigramaById);

module.exports = router;