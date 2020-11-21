const { Rompecabezas } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");

/**
 * Crea un rompecabezas en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nuevo rompecabezas
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearRompecabezas (req, res){

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
        const newRompecabezasObject = {
            nombreRompecabezas: req.body.nombreRompecabezas,
            imagenRompecabezas: req.body.imagenRompecabezas,
            completado: req.body.completado,
            idActividad: req.body.idActividad
        }


       
        try {
            //validar si la actividad existe
            const actividad = await dbManager.Actividades.findOne(
                {
                    where: {
                        idActividad: newRompecabezasObject.idActividad
                    }
                }
            );

            //validar llave foranea
            if(!actividad){
                res.status(400).send({
                    message: "La actividad no existe"
                });
                return;
            }else{

                /**
                 * insert nueva actividad
                 */
                dbManager.Rompecabezas.create(newRompecabezasObject).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "Ese rompecabezas ya existe"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "El rompecabezas no existe"
            });
            return;
        }

    }
}


/**
 * devuelve todos los rompecabezas
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas los rompecabezas
 */
async function getRompecabezas(req, res){

    try {

        const rompecabezas = await dbManager.Rompecabezas.findAll();
        res.json(
            {
                data: rompecabezas
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar rompecabezas"
            }
        );
    }
}


/**
 * Busca un rompecabezas por su campo id
 * @param {*} req: id del rompecabezas que se desea buscar
 * @param {*} res: Objeto Json con datos del rompecabezas encontrado
 */
async function getRompecabezasById(req, res){

    try {

        const {idRompecabezas} = req.params;

        const rompecabezas = await dbManager.Rompecabezas.findOne(
            {
                where: {
                    idRompecabezas: idRompecabezas
                }
            }
        );
        res.json(rompecabezas);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar rompecabezas"
            }
        );
    }
}

/**
 * Elimina un rompecabezas por su id
 * @param {*} req id del rompecabezas que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function deleteRompecabezasById(req, res){

    try{

        const {idRompecabezas} = req.params;

        const rompecabezas = await dbManager.Rompecabezas.findOne(
            {
                where: {
                    idRompecabezas: idRompecabezas
                }
            }
        );

        if(!rompecabezas) {
            res.send(
                {
                    message:"el rompecabezas no existe"
                }
            );
        }else{

            await Rompecabezas.destroy({
                where: {
                    idRompecabezas: idRompecabezas
                }
            });
    
            res.send(
                {
                    message:"rompecabezas eliminado"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar rompecabezas"
            }
        );
    }

}



exports.crearRompecabezas = crearRompecabezas;

exports.getRompecabezas = getRompecabezas;

exports.getRompecabezasById = getRompecabezasById;

exports.deleteRompecabezasById = deleteRompecabezasById;