const { Quiz } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un quiz en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva dificultad
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearQuiz (req, res){

    /**
     * validar request vacio
     */
    if(!req.body){
        response.status(400).send({
            message: "Body vacio!!!"
        });
        return;
    }else{

        /**
         * creacion objeto con datos de entrada
         */
        const newQuizObject = {
            nombreQuiz: req.body.nombreQuiz
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Quiz.create(newQuizObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "Este quiz ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las dificultades
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las dificultades
 */
async function getQuices(req, res){

    try {

        const quices = await dbManager.Quiz.findAll();
        res.json(
            {
                data: quices
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar quices"
            }
        );
    }
}


/**
 * Busca un quiz por su campo idQuiz
 * @param {*} req: idQuiz del quiz que se desea buscar
 * @param {*} res: Objeto Json con datos de la dificultad encontrada
 */
async function getQuizById(req, res){

    try {

        const {idQuiz} = req.params;

        const quiz = await dbManager.Quiz.findOne(
            {
                where: {
                    idQuiz: idQuiz
                }
            }
        );
        res.json(quiz);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar quiz"
            }
        );
    }
}

/**
 * Elimina un quiz por su idQuiz
 * @param {*} req idQuiz del quiz que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteQuizById(req, res){

    try{

        const {idQuiz} = req.params;

        const quiz = await dbManager.Quiz.findOne(
            {
                where: {
                    idQuiz: idQuiz
                }
            }
        );

        if(!quiz) {
            res.send(
                {
                    message:"El quiz no existe"
                }
            );
        }else{

            await Quiz.destroy({
                where: {
                    idQuiz: idQuiz
                }
            });
    
            res.send(
                {
                    message:"Quiz eliminado"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar Dificultad"
            }
        );
    }

}


exports.crearQuiz = crearQuiz;

exports.getQuices = getQuices;

exports.getQuizById = getQuizById;

exports.deleteQuizById = deleteQuizById;

