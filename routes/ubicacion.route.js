var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const ubicacionController = require("../controllers/ubicacion.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas Ubicacion
 */

router.post('/', ubicacionController.crearUbicacion);

router.get('/', ubicacionController.getUbicaciones);

router.get('/:idUbicacion', ubicacionController.getUbicacionById);

router.delete('/:idUbicacion', ubicacionController.deleteUbicacionById);

router.put('/', ubicacionController.updateUbicacion);


module.exports = router;
