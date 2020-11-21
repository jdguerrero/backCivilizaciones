var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const diosController = require("../controllers/dios.controller");


/**
 * rutas **************************************************
*/

router.post('/', diosController.crearDios);

router.get('/', diosController.getDioses);

router.get('/:idDios', diosController.getDiosById);

router.delete('/:idDios', diosController.killDiosById);

router.put('/', diosController.updateDios);

module.exports = router;
