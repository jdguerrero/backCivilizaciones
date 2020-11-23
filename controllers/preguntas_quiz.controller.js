const { PreguntaQuiz } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una pregunta de quiz en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nueva pregunta
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearPreguntaQuiz (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        res.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    }else{

        /**
         * creacion objeto con datos de entrada
         */
        const newPreguntaQuizObject = {
            pregunta: req.body.pregunta,
            respuesta1: req.body.respuesta1,
            respuesta2: req.body.respuesta2,
            respuestaCorrecta: req.body.respuestaCorrecta,
            idQuiz: req.body.idQuiz,
            idBancoPreguntas: req.body.idBancoPreguntas
        }
       
        try {

            //validar si el quiz existe
            const quiz = await dbManager.Quiz.findOne(
                {
                    where: {
                        idQuiz: newPreguntaQuizObject.idQuiz
                    }
                }
            );


            //validar si el banco de preguntas existe
            const bancoPreguntas = await dbManager.BancoDePreguntas.findOne(
                {
                    where: {
                        idBancoPreguntas: newPreguntaQuizObject.idBancoPreguntas
                    }
                }
            );

            //validar llave foranea
            if(!quiz & !bancoPreguntas){
                res.status(400).send({
                    message: "El banco de preguntas o el quiz no existen"
                });
                return;
            }else{

                /**
                 * insert nueva pregunta
                 */
                dbManager.PreguntaQuiz.create(newPreguntaQuizObject).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "Error en llaves foraneas"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "Las llaves foraneas no existen"
            });
            return;
        }

    }
}


/**
 * devuelve todas las preguntas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos las preguntas
 */
async function getPreguntasQuiz(req, res){

    try {

        const preguntas = await dbManager.PreguntaQuiz.findAll();
        res.json(
            {
                data: preguntas
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar preguntas de quiz"
            }
        );
    }
}


/**
 * Busca una pregunta de quiz por id
 * @param {*} req: id de la pregunta que se desea buscar
 * @param {*} res: Objeto Json con datos del arte encontrado
 */
async function getPreguntaQuizById(req, res){

    try {

        const {idPreguntaQuiz} = req.params;

        const pregunta = await dbManager.PreguntaQuiz.findOne(
            {
                where: {
                    idPreguntaQuiz: idPreguntaQuiz
                }
            }
        );
        res.json(pregunta);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar pregunta quiz"
            }
        );
    }
}

async function getPreguntaQuizByBancoID(req, res){

    try {

        const {idBancoPreguntas} = req.params;

        const pregunta = await dbManager.PreguntaQuiz.findOne(
            {
                where: {
                    idBancoPreguntas: idBancoPreguntas
                }
            }
        );
        res.json(pregunta);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar pregunta quiz"
            }
        );
    }
}


/**
 * Elimina una pregunta de quiz por su id
 * @param {*} req id de la pregunta que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function eliminarPreguntaQuizById(req, res){

    try{

        const {idPreguntaQuiz} = req.params;

        const pregunta = await dbManager.PreguntaQuiz.findOne(
            {
                where: {
                    idPreguntaQuiz: idPreguntaQuiz
                }
            }
        );

        if(!pregunta) {
            res.send(
                {
                    message:"pregunta de quiz no existe!!!"
                }
            );
        }else{

            await PreguntaQuiz.destroy({
                where: {
                    idPreguntaQuiz: idPreguntaQuiz
                }
            });
    
            res.send(
                {
                    message:"Pregunta quiz eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar pregunta quiz"
            }
        );
    }

}



exports.crearPreguntaQuiz = crearPreguntaQuiz;

exports.getPreguntasQuiz = getPreguntasQuiz;

exports.getPreguntaQuizById = getPreguntaQuizById;

exports.eliminarPreguntaQuizById = eliminarPreguntaQuizById;

exports.getPreguntaQuizByBancoID = getPreguntaQuizByBancoID;