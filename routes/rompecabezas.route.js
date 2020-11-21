var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const rompecabezasController = require("../controllers/rompecabezas.controller");


/**
 * rutas **************************************************
*/

router.post('/', rompecabezasController.crearRompecabezas);

router.get('/', rompecabezasController.getRompecabezas);

router.get('/:idRompecabezas', rompecabezasController.getRompecabezasById);

router.delete('/:idRompecabezas', rompecabezasController.deleteRompecabezasById);

module.exports = router;