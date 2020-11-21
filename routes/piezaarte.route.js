var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const piezaArteController = require("../controllers/piezaarte.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas PiezaArte
 */

router.post('/', piezaArteController.crearPiezaArte);

router.get('/', piezaArteController.getPiezasArte);

router.get('/:idPiezaArte', piezaArteController.getPiezaArteById);

router.delete('/:idPiezaArte', piezaArteController.deletePiezaArteById);


module.exports = router;
