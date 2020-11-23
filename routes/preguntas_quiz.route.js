var express = require('express');
var router = express.Router();

/**
 * importar controlador
 */

const preguntaQuizController = require("../controllers/preguntas_quiz.controller");


/**
 * rutas **************************************************
*/

router.post('/', preguntaQuizController.crearPreguntaQuiz);

router.get('/', preguntaQuizController.getPreguntasQuiz);

router.get('/:idPreguntaQuiz', preguntaQuizController.getPreguntaQuizById);

router.get('/byBanco/:idBancoPreguntas', preguntaQuizController.getPreguntaQuizByBancoID);

router.delete('/:idPreguntaQuiz', preguntaQuizController.eliminarPreguntaQuizById);


module.exports = router;