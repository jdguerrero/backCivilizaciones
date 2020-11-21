var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const actividadController = require("../controllers/actividades.controller");


/**
 * rutas **************************************************
*/

router.post('/', actividadController.crearActividad);

router.get('/', actividadController.getActividades);

router.get('/:idActividad', actividadController.getActividadById);

router.delete('/:idActividad', actividadController.deleteActividadById);

module.exports = router;
