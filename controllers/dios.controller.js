const { Dios } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");

/**
 * Crea un dios en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nuevo dios
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearDios (req, res){

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
        const newDiosObject = {
            nombreDios: req.body.nombreDios,
            imagenDios: req.body.imagenDios,
            descripcionDios: req.body.descripcionDios,
            idReligion: req.body.idReligion
        }


       
        try {
            //validar si la religion existe
            const religion = await dbManager.Religion.findOne(
                {
                    where: {
                        idReligion: newDiosObject.idReligion
                    }
                }
            );

            //validar llave foranea
            if(!religion){
                res.status(400).send({
                    message: "La religion no existe"
                });
                return;
            }else{

                /**
                 * insert nuevo dios
                 */
                dbManager.Dios.create(newDiosObject).then(
                    data => {
                        res.send(data);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        res.status(400).send({
                            message: "El dios con ese nombre ya existe"
                        });
                    }
                );
            }

        } catch (error) {
            res.status(400).send({
                message: "La religion no existe"
            });
            return;
        }

    }
}


/**
 * devuelve todos los dioses
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos los dioses
 */
async function getDioses(req, res){

    try {

        const dioses = await dbManager.Dios.findAll();
        res.json(
            {
                data: dioses
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar dioses"
            }
        );
    }
}


/**
 * Busca un dios por su campo idDios
 * @param {*} req: idDios del dios que se desea buscar
 * @param {*} res: Objeto Json con datos del dios encontrado
 */
async function getDiosById(req, res){

    try {

        const {idDios} = req.params;

        const dios = await dbManager.Dios.findOne(
            {
                where: {
                    idDios: idDios
                }
            }
        );
        res.json(dios);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar a dios xD"
            }
        );
    }
}

/**
 * Elimina un dios por su idDios
 * @param {*} req idDios del dios que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function killDiosById(req, res){

    try{

        const {idDios} = req.params;

        const dios = await dbManager.Dios.findOne(
            {
                where: {
                    idDios: idDios
                }
            }
        );

        if(!dios) {
            res.send(
                {
                    message:"dios no existe!!!"
                }
            );
        }else{

            await Dios.destroy({
                where: {
                  idDios: idDios
                }
            });
    
            res.send(
                {
                    message:"Dios Ha Muerto"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar a dios xD"
            }
        );
    }

}


/**
 * recibe un objeto JSon con la siguiente estructura

 {
    "idDios": 1,
    "nombreDios": null,
    "imagenDios": null,
    "descripcionDios": null,
    "idReligion:" null

}

 * se identifica el dios que se desea cambiar con el idDios
 * los demas atributos, seran los datos que podran ser actualizados o no
 * en el ejemplo anterior ningun dato es actualizado, cuando un atributo
 * tiene un valor diferente de null, este sera actualizado.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con dios actualizado
 */
async function updateDios(req, res){

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
        const tempDiosObject = {
            idDiosIn: req.body.idDios,
            nuevoNombreDios: req.body.nombreDios,
            nuevaImagenDios: req.body.imagenDios,
            nuevaDescripcionDios: req.body.descripcionDios,
            newIdReligion: req.body.idReligion
        }

        console.log(tempDiosObject);

        if(!tempDiosObject.idDiosIn){
            res.send(
                {
                    message:"Debe ingresar el id del dios que desea actualizar"
                }
            );
        }else{

            /**
             * validar si dios existe
             */
 
            const Dios = await dbManager.Dios.findOne(
                {
                    where: {
                        idDios: tempDiosObject.idDiosIn
                    }
                }
            );


            if(!Dios){
                res.send(
                    {
                        message:"El dios que desea modificar no existe"
                    }
                );
            }else{

                /**
                * updates dios 
                */

                if(!tempDiosObject.nuevoNombreDios){
                    console.log("no actualizo nombre");
                }else{
                    await Dios.update({ nombreDios: tempDiosObject.nuevoNombreDios}, {
                        where: {
                            idDios: tempDiosObject.idDiosIn
                        }
                    });
                }

                if(!tempDiosObject.nuevaImagenDios){
                    console.log("no actualizo imagen");
                }else{
                    await Dios.update({ imagenDios: tempDiosObject.nuevaImagenDios}, {
                        where: {
                            idDios: tempDiosObject.idDiosIn
                        }
                    });
                }

                if(!tempDiosObject.nuevaDescripcionDios){
                    console.log("no actualizo descripcion");
                }else{
                    await Dios.update({ descripcionDios: tempDiosObject.nuevaDescripcionDios }, {
                        where: {
                            idDios: tempDiosObject.idDiosIn
                        }
                    });
                }

                if(!tempDiosObject.newIdReligion){
                    console.log("no actualizo religion del dios");
                }else{

                    //validar si la religion existe
                    const religion = await dbManager.Religion.findOne(
                        {
                            where: {
                                idReligion: tempDiosObject.newIdReligion
                            }
                        }
                    );

                    //validar llave foranea
                    if(!religion){
                        res.status(400).send({
                            message: "La religion no existe (llave foranea)"
                        });
                        return;
                    }else{
                        await Dios.update({ idReligion: tempDiosObject.newIdReligion}, {
                            where: {
                                idDios: tempDiosObject.idDiosIn
                            }
                        });
                    }

                }

                /**
                 * retornar objeto actualizado
                 */
                try {

                    const diosUpdate = await dbManager.Dios.findOne(
                        {
                            where: {
                                idDios: tempDiosObject.idDiosIn
                            }
                        }
                    );
                    res.json(diosUpdate);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al cambiar dios xD"
                        }
                    );
                }



            }
            
        }
    }
}



exports.crearDios = crearDios;

exports.getDioses = getDioses;

exports.getDiosById = getDiosById;

exports.killDiosById = killDiosById;

exports.updateDios = updateDios;