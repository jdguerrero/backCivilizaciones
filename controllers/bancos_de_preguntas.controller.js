const { BancoDePreguntas } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un banco de preguntas en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nuevo banco de preguntas
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearBanco (req, res){

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
        const newBancoObject = {
            nombreBancoPreguntas: req.body.nombreBancoPreguntas,
            idCivilizacion: req.body.idCivilizacion,
            idDificultad: req.body.idDificultad
        }
       
        try {

            //validar si la civilización existe
            const civilización = await dbManager.Civilizacion.findOne(
                {
                    where: {
                        idCivilizacion: newBancoObject.idCivilizacion
                    }
                }
            );


            //validar si la dificultad existe
            const dificultad = await dbManager.Dificultades.findOne(
                {
                    where: {
                        idDificultad: newBancoObject.idDificultad
                    }
                }
            );

            //validar llave foranea
            if(!civilización & !dificultad){
                res.status(400).send({
                    message: "La civilización o la dificultad no existen"
                });
                return;
            }else{

                /**
                 * insert nuevo banco
                 */
                dbManager.BancoDePreguntas.create(newBancoObject).then(
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
 * devuelve todas los bancos
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos las artes
 */
async function getBancos(req, res){

    try {

        const bancos = await dbManager.BancoDePreguntas.findAll();
        res.json(
            {
                data: bancos
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar bancos"
            }
        );
    }
}


/**
 * Busca un banco por su campo idBancoPreguntas
 * @param {*} req: idBancoPreguntas del banco que se desea buscar
 * @param {*} res: Objeto Json con datos del banco encontrado
 */
async function getBancoById(req, res){

    try {

        const {idBancoPreguntas} = req.params;

        const banco = await dbManager.BancoDePreguntas.findOne(
            {
                where: {
                    idBancoPreguntas: idBancoPreguntas
                }
            }
        );
        res.json(banco);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar banco"
            }
        );
    }
}


/**
 * Elimina un banco por su idBancoPreguntas
 * @param {*} req idBancoPreguntas del banco que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function eliminarBancoById(req, res){

    try{

        const {idBancoPreguntas} = req.params;

        const banco = await dbManager.BancoDePreguntas.findOne(
            {
                where: {
                    idBancoPreguntas: idBancoPreguntas
                }
            }
        );

        if(!banco) {
            res.send(
                {
                    message:"el banco no existe!!!"
                }
            );
        }else{

            await BancoDePreguntas.destroy({
                where: {
                    idBancoPreguntas: idBancoPreguntas
                }
            });
    
            res.send(
                {
                    message:"Banco de preguntas eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar banco de pregntas"
            }
        );
    }

}



exports.crearBanco = crearBanco;

exports.getBancos = getBancos;

exports.getBancoById = getBancoById;

exports.eliminarBancoById = eliminarBancoById;



