const { Crucigrama } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un crucigrama en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo crucigrama
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearCrucigrama (req, res){

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
        const newCrucigramaObject = {
            nombreCrucigrama: req.body.nombreCrucigrama
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Crucigrama.create(newCrucigramaObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "Este crucigrama ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas los crucigramas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los crucigramas
 */
async function getCrucigramas(req, res){

    try {

        const crucigramas = await dbManager.Crucigrama.findAll();
        res.json(
            {
                data: crucigramas
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar crucigramas"
            }
        );
    }
}


/**
 * Busca un crucigrama por su campo idCrucigrama
 * @param {*} req: idCrucigrama de la crucigrama que se desea buscar
 * @param {*} res: Objeto Json con datos del crucigrama encontrado
 */
async function getCrucigramaById(req, res){

    try {

        const {idCrucigrama} = req.params;

        const crucigrama = await dbManager.Crucigrama.findOne(
            {
                where: {
                    idCrucigrama: idCrucigrama
                }
            }
        );
        res.json(crucigrama);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar crucigrama"
            }
        );
    }
}

/**
 * Elimina un crucigrama por su idCrucigrama
 * @param {*} req idCrucigrama de la crucigrama que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteCrucigramaById(req, res){

    try{

        const {idCrucigrama} = req.params;

        const crucigrama = await dbManager.Crucigrama.findOne(
            {
                where: {
                    idCrucigrama: idCrucigrama
                }
            }
        );

        if(!crucigrama) {
            res.send(
                {
                    message:"El crucigrama no existe"
                }
            );
        }else{

            await Crucigrama.destroy({
                where: {
                    idCrucigrama: idCrucigrama
                }
            });
    
            res.send(
                {
                    message:"Crucigrama eliminado"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar crucigrama"
            }
        );
    }

}


exports.crearCrucigrama = crearCrucigrama;

exports.getCrucigramas = getCrucigramas;

exports.getCrucigramaById = getCrucigramaById;

exports.deleteCrucigramaById = deleteCrucigramaById;

