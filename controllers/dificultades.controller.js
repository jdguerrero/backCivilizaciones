const { Dificultades } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una dificultad en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva dificultad
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearDificultad (req, res){

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
        const newDificultadObject = {
            dificultad: req.body.dificultad
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Dificultades.create(newDificultadObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "Esta dificultad ya existe"
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
async function getDificultades(req, res){

    try {

        const dificultades = await dbManager.Dificultades.findAll();
        res.json(
            {
                data: dificultades
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar dificultades"
            }
        );
    }
}


/**
 * Busca una dificultad por su campo idDificultad
 * @param {*} req: idDificultad de la dificultad que se desea buscar
 * @param {*} res: Objeto Json con datos de la dificultad encontrada
 */
async function getDificultadById(req, res){

    try {

        const {idDificultad} = req.params;

        const dificultad = await dbManager.Dificultades.findOne(
            {
                where: {
                    idDificultad: idDificultad
                }
            }
        );
        res.json(dificultad);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar dificultad"
            }
        );
    }
}

/**
 * Elimina una dificultad por su idDificultad
 * @param {*} req idDificultad de la  dificultadque se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteDificultadById(req, res){

    try{

        const {idDificultad} = req.params;

        const dificultad = await dbManager.Dificultades.findOne(
            {
                where: {
                    idDificultad: idDificultad
                }
            }
        );

        if(!dificultad) {
            res.send(
                {
                    message:"La dificultad no existe"
                }
            );
        }else{

            await Dificultades.destroy({
                where: {
                    idDificultad: idDificultad
                }
            });
    
            res.send(
                {
                    message:"Dificultad eliminada"
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


exports.crearDificultad = crearDificultad;

exports.getDificultades = getDificultades;

exports.getDificultadById = getDificultadById;

exports.deleteDificultadById = deleteDificultadById;

