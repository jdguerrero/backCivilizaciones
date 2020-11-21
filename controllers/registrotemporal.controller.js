const { RegistroTemporal } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");
const { deleteReligionById } = require("./religion.controller");


/**
 * Crea una pieza de arte en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo registro temporal
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearRegistroTemporal (req, res){

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
        const newRegistroTemporalObject = {
            añoAparicion: req.body.añoAparicion,
            añoUltimoRegistro: req.body.añoUltimoRegistro,
            descripcion: req.body.descripcion
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.RegistroTemporal.create(newRegistroTemporalObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(500).send({
                    message: "Error en servidor"
                });
            }
        );
    }
}


/**
 * devuelve todos los registros temporales
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los registros temporales
 */
async function getRegistrosTemporales(req, res){

    try {

        const registrosTemporales = await dbManager.RegistroTemporal.findAll();
        res.json(
            {
                data: registrosTemporales
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar registros temporales"
            }
        );
    }
}


/**
 * Busca un registro temporal por su campo idRegistroTemporal
 * @param {*} req: idRegistroTemporal del registro temporal que se desea buscar
 * @param {*} res: Objeto Json con datos del registro temporal encontrado
 */
async function getRegistroTemporalById(req, res){

    try {

        const {idRegistroTemporal} = req.params;

        const registroTemporal = await dbManager.RegistroTemporal.findOne(
            {
                where: {
                    idRegistroTemporal: idRegistroTemporal
                }
            }
        );
        res.json(registroTemporal);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar registro temporal"
            }
        );
    }
}

/**
 * Elimina un registro temporal por su idRegistroTemporal
 * @param {*} req idRegistroTemproal del registro temporal que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteRegistroTemporalById(req, res){

    try{

        const {idRegistroTemporal} = req.params;

        const registroTemporal = await dbManager.RegistroTemporal.findOne(
            {
                where: {
                    idRegistroTemporal: idRegistroTemporal
                }
            }
        );

        if(!registroTemporal) {
            res.send(
                {
                    message:"El registro temporal no existe"
                }
            );
        }else{

            await RegistroTemporal.destroy({
                where: {
                  idRegistroTemporal: idRegistroTemporal
                }
            });
    
            res.send(
                {
                    message:"Registro temporal eliminado"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar registro temporal"
            }
        );
    }

}


exports.crearRegistroTemporal = crearRegistroTemporal;

exports.getRegistrosTemporales = getRegistrosTemporales;

exports.getRegistroTemporalById = getRegistroTemporalById;

exports.deleteRegistroTemporalById = deleteRegistroTemporalById;