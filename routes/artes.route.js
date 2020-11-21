var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const arteController = require("../controllers/artes.controller");


/**
 * rutas **************************************************
*/

router.post('/', arteController.crearArte);

router.get('/', arteController.getArtes);

router.get('/:idArte', arteController.getArteById);

router.delete('/:idArte', arteController.eliminarArteById);

router.put('/', arteController.updateArte);

module.exports = router;