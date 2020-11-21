const { Piezas } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");

/**
 * Crea ua pieza en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para unanueva pieza
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearPieza (req, res){

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
        const newPiezaObject = {
            imagenPieza: req.body.imagenPieza,
            ordenPieza: req.body.ordenPieza,
            idRompecabezas: req.body.idRompecabezas
        }


       
        try {
            //validar si el rompecabezas existe
            const rompecabezas = await dbManager.Rompecabezas.findOne(
                {
                    where: {
                        idRompecabezas: newPiezaObject.idRompecabezas
                    }
                }
            );

            //validar llave foranea
            if(!rompecabezas){
                res.status(400).send({
                    message: "El rompecabezas no existe"
                });
                return;
            }else{

                /**
                 * insert nueva pieza
                 */
                dbManager.Piezas.create(newPiezaObject).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "Esa pieza ya existe"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "La pieza no existe"
            });
            return;
        }

    }
}


/**
 * devuelve todas las piezas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las piezas
 */
async function getPiezas(req, res){

    try {

        const piezas = await dbManager.Piezas.findAll();
        res.json(
            {
                data: piezas
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar piezas"
            }
        );
    }
}


/**
 * Busca una pieza por su campo id
 * @param {*} req: id de la pieza que se desea buscar
 * @param {*} res: Objeto Json con datos de la pieza encontrada
 */
async function getPiezaById(req, res){

    try {

        const {idPieza} = req.params;

        const pieza = await dbManager.Piezas.findOne(
            {
                where: {
                    idPieza: idPieza
                }
            }
        );
        res.json(pieza);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar pieza"
            }
        );
    }
}

/**
 * Elimina una pieza por su id
 * @param {*} req id de la pieza que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function deletePiezaById(req, res){

    try{

        const {idPieza} = req.params;

        const pieza = await dbManager.Piezas.findOne(
            {
                where: {
                    idPieza: idPieza
                }
            }
        );

        if(!pieza) {
            res.send(
                {
                    message:"la pieza no existe"
                }
            );
        }else{

            await Piezas.destroy({
                where: {
                    idPieza: idPieza
                }
            });
    
            res.send(
                {
                    message:"Pieza eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar pieza"
            }
        );
    }

}



exports.crearPieza = crearPieza;

exports.getPiezas = getPiezas;

exports.getPiezaById = getPiezaById;

exports.deletePiezaById = deletePiezaById;