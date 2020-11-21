var express = require('express');
var router = express.Router();


/**
 * importar controlador
 */

const religionController = require("../controllers/religion.controller");


/**
 * rutas **************************************************
*/

router.post('/', religionController.crearReligion);

router.get('/', religionController.getReligiones);

router.get('/:idReligion', religionController.getReligionById);

router.delete('/:idReligion', religionController.deleteReligionById);

router.put('/', religionController.updateReligion);

module.exports = router;
