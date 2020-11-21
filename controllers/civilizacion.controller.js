const { Civilizacion } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una civilización en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para una nueva civilización
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearCivilizacion (req, res){

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
        const newCivilizacionObject = {
            nombreCivilizacion: req.body.nombreCivilizacion,
            imagenCivilizacion: req.body.imagenCivilizacion,
            idReligion: req.body.idReligion,
            idUbicacion: req.body.idUbicacion,
            idEstiloVida: req.body.idEstiloVida,
            idRegistroTemporal: req.body.idRegistroTemporal,
            idArte: req.body.idArte
        }
       
        try {

            //validar si la religión existe
            const religion = await dbManager.Religion.findOne(
                {
                    where: {
                        idReligion: newCivilizacionObject.idReligion
                    }
                }
            );

            //validar si la ubicación existe
            const ubicacion = await dbManager.Ubicacion.findOne(
                {
                    where: {
                        idUbicacion: newCivilizacionObject.idUbicacion
                    }
                }
            );

            //validar si el estilo de vida existe
            const estiloVida = await dbManager.EstiloVida.findOne(
                {
                    where: {
                        idEstiloVida: newCivilizacionObject.idEstiloVida
                    }
                }
            );

            //validar si el registro temporal existe
            const registroTemporal = await dbManager.RegistroTemporal.findOne(
                {
                    where: {
                        idRegistroTemporal: newCivilizacionObject.idRegistroTemporal
                    }
                }
            );

            //validar si el arte existe
            const arte = await dbManager.Arte.findOne(
                {
                    where: {
                        idArte: newCivilizacionObject.idArte
                    }
                }
            );

            //validar llave foranea
            if(!religion & !ubicacion & !estiloVida & !registroTemporal & !arte){
                res.status(400).send({
                    message: "Alguna de las llaves foraneas no existen"
                });
                return;
            }else{

                /**
                 * insert nueva civilizacion
                 */
                dbManager.Civilizacion.create(newCivilizacionObject).then(
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
 * devuelve todas las civilizaciones
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las civilizaciones
 */
async function getCivilizaciones(req, res){

    try {

        const civilizaciones = await dbManager.Civilizacion.findAll();
        res.json(
            {
                data: civilizaciones
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar civilizaciones"
            }
        );
    }
}


/**
 * Busca un arte por su campo idCivilizacion
 * @param {*} req: idCivilizacion de la civilizacion que se desea buscar
 * @param {*} res: Objeto Json con datos de la civilizacion encontrada
 */
async function getCivilizacionById(req, res){

    try {

        const {idCivilizacion} = req.params;

        const civilizacion = await dbManager.Civilizacion.findOne(
            {
                where: {
                    idCivilizacion: idCivilizacion
                }
            }
        );
        res.json(civilizacion);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar civilizaciones"
            }
        );
    }
}


/**
 * Elimina una civilizacion por su idCivilizacion
 * @param {*} req idCivilizacion del arte que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function eliminarCivilizacionById(req, res){

    try{

        const {idCivilizacion} = req.params;

        const civilizacion = await dbManager.Civilizacion.findOne(
            {
                where: {
                    idCivilizacion: idCivilizacion
                }
            }
        );

        if(!civilizacion) {
            res.send(
                {
                    message:"civilizacion no existe!!!"
                }
            );
        }else{

            await Civilizacion.destroy({
                where: {
                    idCivilizacion: idCivilizacion
                }
            });
    
            res.send(
                {
                    message:"Civilizacion eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar civilizacion"
            }
        );
    }

}


exports.crearCivilizacion = crearCivilizacion;

exports.getCivilizaciones = getCivilizaciones;

exports.getCivilizacionById = getCivilizacionById;

exports.eliminarCivilizacionById = eliminarCivilizacionById;