const { Ubicacion } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea una ubicacion en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva ubicacion
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearUbicacion (req, res){

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
        const newUbicacionObject = {
            departamento: req.body.departamento,
            imgMapa: req.body.imgMapa
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.Ubicacion.create(newUbicacionObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "Ubicacion con este nombre ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las ubicaciones
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las ubicaciones
 */
async function getUbicaciones(req, res){

    try {

        const ubicaciones = await dbManager.Ubicacion.findAll();
        res.json(
            {
                data: ubicaciones
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar ubicaciones"
            }
        );
    }
}


/**
 * Busca una ubicacion por su campo idubicacion
 * @param {*} req: idUbicacion de la pieza de arte que se desea buscar
 * @param {*} res: Objeto Json con datos de la pieza de arte encontrada
 */
async function getUbicacionById(req, res){

    try {

        const {idUbicacion} = req.params;

        const ubicacion = await dbManager.Ubicacion.findOne(
            {
                where: {
                    idUbicacion: idUbicacion
                }
            }
        );
        res.json(ubicacion);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar ubicacion"
            }
        );
    }
}

/**
 * Elimina una ubicacion por su idubicacion
 * @param {*} req idUbicacion de la ubicacionque se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteUbicacionById(req, res){

    try{

        const {idUbicacion} = req.params;

        const ubicacion = await dbManager.Ubicacion.findOne(
            {
                where: {
                    idUbicacion: idUbicacion
                }
            }
        );

        if(!ubicacion) {
            res.send(
                {
                    message:"La ubicacion no existe"
                }
            );
        }else{

            await Ubicacion.destroy({
                where: {
                  idUbicacion: idUbicacion
                }
            });
    
            res.send(
                {
                    message:"Ubicacion eliminada"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar ubicacion"
            }
        );
    }

}

/**
 * recibe un objeto JSon con la siguiente estructura

{
  "idUbicacion": 1,
  "departamento": null,
  "imgMapa": null
}

 * se identifica la ubicacion que se desea cambiar con el idUbicacion
 * los demas atributos, seran los datos que podran ser actualizados o no
 * en el ejemplo anterior ningun dato es actualizado, cuando un atributo
 * tiene un valor diferente de null, este sera actualizado.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con la religion actualizada
 */
async function updateUbicacion (req, res){

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
        const tempUbicacionObject = {
            idUbicacionIn: req.body.idUbicacion,
            departamento: req.body.departamento,
            imgMapa: req.body.imgMapa
        }

        console.log(tempUbicacionObject);

        if(!tempUbicacionObject.idUbicacionIn){
            res.send(
                {
                    message:"Debe ingresar el id de la ubicacion que desea actualizar"
                }
            );
        }else{

            /**
             * validar si la ubicacion existe
             */
 
            const Ubicacion = await dbManager.Ubicacion.findOne(
                {
                    where: {
                        idUbicacion: tempUbicacionObject.idUbicacionIn
                    }
                }
            );


            if(!Ubicacion){
                res.send(
                    {
                        message:"La ubicacion que desea modificar no existe"
                    }
                );
            }else{

                /**
                * updates ubicacion 
                */

                if(!tempUbicacionObject.departamento){
                    console.log("no actualizo departamento");
                }else{
                    await Ubicacion.update({ departamento: tempUbicacionObject.departamento}, {
                        where: {
                            idUbicacion: tempUbicacionObject.idUbicacionIn
                        }
                    });
                }

                if(!tempUbicacionObject.imgMapa){
                    console.log("no actualizo mapa");
                }else{
                    await Ubicacion.update({ imgMapa: tempUbicacionObject.imgMapa }, {
                        where: {
                            idUbicacion: tempUbicacionObject.idUbicacionIn
                        }
                    });
                }



                try {

                    const ubicacionUpdate = await dbManager.Ubicacion.findOne(
                        {
                            where: {
                                idUbicacion: tempUbicacionObject.idUbicacionIn
                            }
                        }
                    );
                    res.json(ubicacionUpdate);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al actualizar ubicacion"
                        }
                    );
                }

            }
        }
    }
}


exports.crearUbicacion = crearUbicacion;

exports.getUbicaciones = getUbicaciones;

exports.getUbicacionById = getUbicacionById;

exports.deleteUbicacionById = deleteUbicacionById;

exports.updateUbicacion = updateUbicacion;