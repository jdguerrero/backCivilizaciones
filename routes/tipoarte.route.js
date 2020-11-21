var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const tipoArteController = require("../controllers/tipoarte.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas TipoArte
 */

router.post('/', tipoArteController.crearTipoArte);

router.get('/', tipoArteController.getTiposArte);

router.get('/:idTipoArte', tipoArteController.getTipoArteById);

router.delete('/:idTipoArte', tipoArteController.deleteTipoArteById);


module.exports = router;
