var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const registroTemporalController = require("../controllers/registrotemporal.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas RegistroTemporal
 */

router.post('/', registroTemporalController.crearRegistroTemporal);

router.get('/', registroTemporalController.getRegistrosTemporales);

router.get('/:idRegistroTemporal', registroTemporalController.getRegistroTemporalById);

router.delete('/:idRegistroTemporal', registroTemporalController.deleteRegistroTemporalById);


module.exports = router;
