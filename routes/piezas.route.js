var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const piezaController = require("../controllers/piezas.controller");


/**
 * rutas **************************************************
*/

router.post('/', piezaController.crearPieza);

router.get('/', piezaController.getPiezas);

router.get('/:idPieza', piezaController.getPiezaById);

router.delete('/:idPieza', piezaController.deletePiezaById);

module.exports = router;
