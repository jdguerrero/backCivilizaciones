var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const crucigramaController = require("../controllers/crucigrama.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas Ubicacion
 */

router.post('/', crucigramaController.crearCrucigrama);

router.get('/', crucigramaController.getCrucigramas);

router.get('/:idCrucigrama', crucigramaController.getCrucigramaById);

router.delete('/:idCrucigrama', crucigramaController.deleteCrucigramaById);


module.exports = router;
