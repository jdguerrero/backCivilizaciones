const { PreguntaCrucigrama } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una pregunta de crucigrama en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nueva pregunta
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearPreguntaCrucigrama (req, res){

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
        const newPreguntaCrucigramaObject = {
            pregunta: req.body.pregunta,
            idBancoPreguntas: req.body.idBancoPreguntas,
            idCrucigrama: req.body.idCrucigrama
        }
       
        try {

            //validar si el banco de preguntas existe
            const bancoPreguntas = await dbManager.BancoDePreguntas.findOne(
                {
                    where: {
                        idBancoPreguntas: newPreguntaCrucigramaObject.idBancoPreguntas
                    }
                }
            );


            //validar si el crucigrama existe
            const crucigrama = await dbManager.Crucigrama.findOne(
                {
                    where: {
                        idCrucigrama: newPreguntaCrucigramaObject.idCrucigrama
                    }
                }
            );

            //validar llave foranea
            if(!bancoPreguntas & !crucigrama){
                res.status(400).send({
                    message: "El banco de preguntas o el crucigrama no existen"
                });
                return;
            }else{

                /**
                 * insert nueva pregunta
                 */
                dbManager.PreguntaCrucigrama.create(newPreguntaCrucigramaObject).then(
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
async function getPreguntasCrucigrama(req, res){

    try {

        const preguntas = await dbManager.PreguntaCrucigrama.findAll();
        res.json(
            {
                data: preguntas
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar preguntas de crucigraam"
            }
        );
    }
}


/**
 * Busca una pregunta de crucigrama por id
 * @param {*} req: id de la pregunta que se desea buscar
 * @param {*} res: Objeto Json con datos del arte encontrado
 */
async function getPreguntaCrucigramaById(req, res){

    try {

        const {idPreguntaCrucigrama} = req.params;

        const pregunta = await dbManager.PreguntaCrucigrama.findOne(
            {
                where: {
                    idPreguntaCrucigrama: idPreguntaCrucigrama
                }
            }
        );
        res.json(pregunta);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar pregunta crucigrama"
            }
        );
    }
}


/**
 * Elimina una pregunta de crucigrama por su id
 * @param {*} req id de la pregunta que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function eliminarPreguntaCrucigramaById(req, res){

    try{

        const {idPreguntaCrucigrama} = req.params;

        const pregunta = await dbManager.PreguntaCrucigrama.findOne(
            {
                where: {
                    idPreguntaCrucigrama: idPreguntaCrucigrama
                }
            }
        );

        if(!pregunta) {
            res.send(
                {
                    message:"pregunta de crucigrama no existe!!!"
                }
            );
        }else{

            await PreguntaCrucigrama.destroy({
                where: {
                    idPreguntaCrucigrama: idPreguntaCrucigrama
                }
            });
    
            res.send(
                {
                    message:"Pregunta Crucigrama eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar pregunta crucigrama"
            }
        );
    }

}



exports.crearPreguntaCrucigrama = crearPreguntaCrucigrama;

exports.getPreguntasCrucigrama = getPreguntasCrucigrama;

exports.getPreguntaCrucigramaById = getPreguntaCrucigramaById;

exports.eliminarPreguntaCrucigramaById = eliminarPreguntaCrucigramaById;