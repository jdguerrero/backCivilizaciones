const { Religion } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");

// Juan David Lis
/**
 * Crea una religion en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nueva religion
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearReligion (req, res){

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
        const newReligionObject = {
            nombreReligion: req.body.nombreReligion,
            descripcionReligion: req.body.descripcionReligion,
            imagenReligion: req.body.imagenReligion
        }

        /**
         * insert nueva religion
         */
        dbManager.Religion.create(newReligionObject).then(
            data => {
                res.send(data);
            }
        ).catch(
            error => {
                console.log(error);
                res.status(400).send({
                    message: "La religion ya existe"
                });
            }
        );
    }
}


/**
 * devuelve todas las religiones
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas las Religiones
 */
async function getReligiones(req, res){

    try {

        const religiones = await dbManager.Religion.findAll();
        res.json(
            {
                data: religiones
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar religiones"
            }
        );
    }
}


/**
 * Busca una religion por su campo idReligion
 * @param {*} req: idReligion de la religion que se desea buscar
 * @param {*} res: Objeto Json con datos de la religion encontrada
 */
async function getReligionById(req, res){

    try {

        const {idReligion} = req.params;

        const religion = await dbManager.Religion.findOne(
            {
                where: {
                    idReligion: idReligion
                }
            }
        );
        res.json(religion);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar religion xD"
            }
        );
    }
}

/**
 * Elimina una religion por su idReligion
 * @param {*} req idReligion de la religion que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteReligionById(req, res){

    try{

        const {idReligion} = req.params;

        const religion = await dbManager.Religion.findOne(
            {
                where: {
                    idReligion: idReligion
                }
            }
        );

        if(!religion) {
            res.send(
                {
                    message:"La Religión no existe"
                }
            );
        }else{

            await Religion.destroy({
                where: {
                  idReligion: idReligion
                }
            });
    
            res.send(
                {
                    message:"Religión Eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar religion"
            }
        );
    }

}


/**
 * recibe un objeto JSon con la siguiente estructura

 {
  "idReligion": 1,
  "nombreReligion": null,
  "descripcionReligion": null,
  "imagenReligion": null
}

 * se identifica la religion que se desea cambiar con el idReligion
 * los demas atributos, seran los datos que podran ser actualizados o no
 * en el ejemplo anterior ningun dato es actualizado, cuando un atributo
 * tiene un valor diferente de null, este sera actualizado.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con la religion actualizada
 */
async function updateReligion (req, res){

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
        const tempReligionObject = {
            idReligionIn: req.body.idReligion,
            nuevoNombre: req.body.nombreReligion,
            nuevaDescripcion: req.body.descripcionReligion,
            nuevaImg: req.body.imagenReligion
        }

        console.log(tempReligionObject);

        if(!tempReligionObject.idReligionIn){
            res.send(
                {
                    message:"Debe ingresar el id de la religion que desea actualizar"
                }
            );
        }else{

            /**
             * validar si Religion existe
             */
 
            const Religion = await dbManager.Religion.findOne(
                {
                    where: {
                        idReligion: tempReligionObject.idReligionIn
                    }
                }
            );


            if(!Religion){
                res.send(
                    {
                        message:"La religion que desea modificar no existe"
                    }
                );
            }else{

                /**
                * updates religion 
                */

                if(!tempReligionObject.nuevoNombre){
                    console.log("no actualizo nombre");
                }else{
                    await Religion.update({ nombreReligion: tempReligionObject.nuevoNombre}, {
                        where: {
                            idReligion: tempReligionObject.idReligionIn
                        }
                    });
                }

                if(!tempReligionObject.nuevaDescripcion){
                    console.log("no actualizo descripcion");
                }else{
                    await Religion.update({ descripcionReligion: tempReligionObject.nuevaDescripcion }, {
                        where: {
                            idReligion: tempReligionObject.idReligionIn
                        }
                    });
                }

                if(!tempReligionObject.nuevaImg){
                    console.log("no actualizo img");
                }else{
                    await Religion.update({ imagenReligion: tempReligionObject.nuevaImg }, {
                        where: {
                            idReligion: tempReligionObject.idReligionIn
                        }
                    });
                }


                try {

                    const religionUpdate = await dbManager.Religion.findOne(
                        {
                            where: {
                                idReligion: tempReligionObject.idReligionIn
                            }
                        }
                    );
                    res.json(religionUpdate);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al actualizar religion xD"
                        }
                    );
                }

            }
        }
    }
}



exports.crearReligion = crearReligion;

exports.getReligiones = getReligiones;

exports.getReligionById = getReligionById;

exports.deleteReligionById = deleteReligionById;

exports.updateReligion = updateReligion;
