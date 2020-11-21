var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const bancoController = require("../controllers/bancos_de_preguntas.controller");


/**
 * rutas **************************************************
*/

router.post('/', bancoController.crearBanco);

router.get('/', bancoController.getBancos);

router.get('/:idBancoPreguntas', bancoController.getBancoById);

router.delete('/:idBancoPreguntas', bancoController.eliminarBancoById);

module.exports = router;