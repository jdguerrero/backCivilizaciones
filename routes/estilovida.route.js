var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const estiloVidaController = require("../controllers/estilovida.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas EstiloVida
 */

router.post('/', estiloVidaController.crearEstiloVida);

router.get('/', estiloVidaController.getEstilosVida);

router.get('/:idEstiloVida', estiloVidaController.getEstiloVidaById);

router.delete('/:idEstiloVida', estiloVidaController.deleteEstiloVidaById);


module.exports = router;
