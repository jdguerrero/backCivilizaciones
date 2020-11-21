var express = require('express');
var router = express.Router();


/**
 * importar controladores
 */

const quizController = require("../controllers/quiz.controller");





/**
 * rutas **************************************************
*/

/**
 *  rutas Ubicacion
 */

router.post('/', quizController.crearQuiz);

router.get('/', quizController.getQuices);

router.get('/:idQuiz', quizController.getQuizById);

router.delete('/:idQuiz', quizController.deleteQuizById);


module.exports = router;