const { TipoArte } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una tipo de arte en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo tipo de arte
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearTipoArte (req, res){

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
        const newTipoArteObject = {
            nombreTipo: req.body.nombreTipo
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.TipoArte.create(newTipoArteObject).then(
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
 * devuelve todas los tipos de arte
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los tipos de arte
 */
async function getTiposArte(req, res){

    try {

        const tiposArte = await dbManager.TipoArte.findAll();
        res.json(
            {
                data: tiposArte
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar tipos de arte"
            }
        );
    }
}


/**
 * Busca un tipo de arte por su campo idTipoArte
 * @param {*} req: idTipoArte del tipo de arte que se desea buscar
 * @param {*} res: Objeto Json con datos del tipo de arte encontrada
 */
async function getTipoArteById(req, res){

    try {

        const {idTipoArte} = req.params;

        const tipoArte = await dbManager.TipoArte.findOne(
            {
                where: {
                    idTipoArte: idTipoArte
                }
            }
        );
        res.json(tipoArte);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar tipo de arte"
            }
        );
    }
}

/**
 * Elimina un tipo de arte por su idTipoArte
 * @param {*} req idTipoArte del tipo de arte que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteTipoArteById(req, res){

    try{

        const {idTipoArte} = req.params;

        const tipoArte = await dbManager.TipoArte.findOne(
            {
                where: {
                    idTipoArte: idTipoArte
                }
            }
        );

        if(!tipoArte) {
            res.send(
                {
                    message:"El tipo de arte no existe"
                }
            );
        }else{

            await TipoArte.destroy({
                where: {
                  idTipoArte: idTipoArte
                }
            });
    
            res.send(
                {
                    message:"Tipo de arte eliminado"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar tipo de arte"
            }
        );
    }

}


exports.crearTipoArte = crearTipoArte;

exports.getTiposArte = getTiposArte;

exports.getTipoArteById = getTipoArteById;

exports.deleteTipoArteById = deleteTipoArteById;