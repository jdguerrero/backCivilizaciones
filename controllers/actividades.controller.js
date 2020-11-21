const { Actividades } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");

/**
 * Crea un dios en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nuevo dios
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearActividad (req, res){

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
        const newActividadObject = {
            fecha: req.body.fecha,
            idCivilizacion: req.body.idCivilizacion
        }


       
        try {
            //validar si la civilizacion existe
            const civilizacion = await dbManager.Civilizacion.findOne(
                {
                    where: {
                        idCivilizacion: newActividadObject.idCivilizacion
                    }
                }
            );

            //validar llave foranea
            if(!civilizacion){
                res.status(400).send({
                    message: "La civilizacion no existe"
                });
                return;
            }else{

                /**
                 * insert nueva actividad
                 */
                dbManager.Actividades.create(newActividadObject).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "Esa actividad ya existe"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "La actividad no existe"
            });
            return;
        }

    }
}


/**
 * devuelve todas las actividades
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las actividaes
 */
async function getActividades(req, res){

    try {

        const actividades = await dbManager.Actividades.findAll();
        res.json(
            {
                data: actividades
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar actividades"
            }
        );
    }
}


/**
 * Busca una actividad por su campo id
 * @param {*} req: id de la actividad que se desea buscar
 * @param {*} res: Objeto Json con datos de la actividad encontrada
 */
async function getActividadById(req, res){

    try {

        const {idActividad} = req.params;

        const actividad = await dbManager.Actividades.findOne(
            {
                where: {
                    idActividad: idActividad
                }
            }
        );
        res.json(actividad);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar actividad"
            }
        );
    }
}

/**
 * Elimina una actividad por su id
 * @param {*} req id de la actividad que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function deleteActividadById(req, res){

    try{

        const {idActividad} = req.params;

        const actividad = await dbManager.Actividades.findOne(
            {
                where: {
                    idActividad: idActividad
                }
            }
        );

        if(!actividad) {
            res.send(
                {
                    message:"actividad no existe"
                }
            );
        }else{

            await Actividades.destroy({
                where: {
                    idActividad: idActividad
                }
            });
    
            res.send(
                {
                    message:"actividad eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar actividad"
            }
        );
    }

}



exports.crearActividad = crearActividad;

exports.getActividades = getActividades;

exports.getActividadById = getActividadById;

exports.deleteActividadById = deleteActividadById;