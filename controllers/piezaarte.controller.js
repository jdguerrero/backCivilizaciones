const { PiezaArte } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una pieza de arte en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva pieza de arte
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearPiezaArte (req, res){

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
        const newPiezaArteObject = {
            nombrePieza: req.body.nombrePieza,
            imagenPieza: req.body.imagenPieza
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.PiezaArte.create(newPiezaArteObject).then(
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
 * devuelve todas las piezas de arte
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las piezas de arte
 */
async function getPiezasArte(req, res){

    try {

        const piezasArte = await dbManager.PiezaArte.findAll();
        res.json(
            {
                data: piezasArte
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar piezas de arte"
            }
        );
    }
}


/**
 * Busca una pieza de arte por su campo idPiezaArte
 * @param {*} req: idReligion de la pieza de arte que se desea buscar
 * @param {*} res: Objeto Json con datos de la pieza de arte encontrada
 */
async function getPiezaArteById(req, res){

    try {

        const {idPiezaArte} = req.params;

        const piezaArte = await dbManager.PiezaArte.findOne(
            {
                where: {
                    idPiezaArte: idPiezaArte
                }
            }
        );
        res.json(piezaArte);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar pieza de arte"
            }
        );
    }
}

/**
 * Elimina una pieza de arte por su idPiezaArte
 * @param {*} req idReligion de la pieza de arte que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deletePiezaArteById(req, res){

    try{

        const {idPiezaArte} = req.params;

        const piezaArte = await dbManager.PiezaArte.findOne(
            {
                where: {
                    idPiezaArte: idPiezaArte
                }
            }
        );

        if(!piezaArte) {
            res.send(
                {
                    message:"La pieza de arte no existe"
                }
            );
        }else{

            await PiezaArte.destroy({
                where: {
                  idPiezaArte: idPiezaArte
                }
            });
    
            res.send(
                {
                    message:"Pieza de arte eliminada"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar pieza de arte"
            }
        );
    }

}


exports.crearPiezaArte = crearPiezaArte;

exports.getPiezasArte = getPiezasArte;

exports.getPiezaArteById = getPiezaArteById;

exports.deletePiezaArteById = deletePiezaArteById;