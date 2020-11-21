var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const civilizacionesController = require("../controllers/civilizacion.controller");



/**
 * rutas **************************************************
*/

router.post('/', civilizacionesController.crearCivilizacion);

router.get('/', civilizacionesController.getCivilizaciones);

router.get('/:idCivilizacion', civilizacionesController.getCivilizacionById);

router.delete('/:idCivilizacion', civilizacionesController.eliminarCivilizacionById);

module.exports = router;