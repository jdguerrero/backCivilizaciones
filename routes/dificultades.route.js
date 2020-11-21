var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const dificultadController = require("../controllers/dificultades.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas Ubicacion
 */

router.post('/', dificultadController.crearDificultad);

router.get('/', dificultadController.getDificultades);

router.get('/:idDificultad', dificultadController.getDificultadById);

router.delete('/:idDificultad', dificultadController.deleteDificultadById);


module.exports = router;
