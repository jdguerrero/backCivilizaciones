const { Arte } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un Arte en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para un nuevo arte
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
async function crearArte (req, res){

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
        const newArteObject = {
            descripcion: req.body.descripcion,
            idTipoArte: req.body.idTipoArte,
            idPiezaArte: req.body.idPiezaArte
        }
       
        try {

            //validar si el tipo de arte existe
            const tipoArte = await dbManager.TipoArte.findOne(
                {
                    where: {
                        idTipoArte: newArteObject.idTipoArte
                    }
                }
            );


            //validar si la pieza de arte existe
            const piezaArte = await dbManager.PiezaArte.findOne(
                {
                    where: {
                        idPiezaArte: newArteObject.idPiezaArte
                    }
                }
            );

            //validar llave foranea
            if(!tipoArte & !piezaArte){
                res.status(400).send({
                    message: "La pieza de arte o el tipo de arte no existen"
                });
                return;
            }else{

                /**
                 * insert nuevo dios
                 */
                dbManager.Arte.create(newArteObject).then(
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
 * devuelve todas las Artes
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todos las artes
 */
async function getArtes(req, res){

    try {

        const artes = await dbManager.Arte.findAll();
        res.json(
            {
                data: artes
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar artes"
            }
        );
    }
}


/**
 * Busca un arte por su campo idArte
 * @param {*} req: idArte del arte que se desea buscar
 * @param {*} res: Objeto Json con datos del arte encontrado
 */
async function getArteById(req, res){

    try {

        const {idArte} = req.params;

        const arte = await dbManager.Arte.findOne(
            {
                where: {
                    idArte: idArte
                }
            }
        );
        res.json(arte);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar arte"
            }
        );
    }
}


/**
 * Elimina un arte por su idArte
 * @param {*} req idArte del arte que se desea eliminar
 * @param {*} res Mensaje informativo
 */
async function eliminarArteById(req, res){

    try{

        const {idArte} = req.params;

        const arte = await dbManager.Arte.findOne(
            {
                where: {
                    idArte: idArte
                }
            }
        );

        if(!arte) {
            res.send(
                {
                    message:"arte no existe!!!"
                }
            );
        }else{

            await Arte.destroy({
                where: {
                    idArte: idArte
                }
            });
    
            res.send(
                {
                    message:"Arte eliminada"
                }
            );

        }

    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar arte"
            }
        );
    }

}


/**
 * recibe un objeto JSon con la siguiente estructura

 {
    "idArte": 1,
    "añoCreacion": null,
    "idTipoArte": null,
    "idPiezaArte": null

}

 * se identifica el arte que se desea cambiar con el idArte
 * los demas atributos, seran los datos que podran ser actualizados o no
 * en el ejemplo anterior ningun dato es actualizado, cuando un atributo
 * tiene un valor diferente de null, este sera actualizado.
 * 
 * @param {*} req objeto json de la descripcion anterior
 * @param {*} res objeto json con dios actualizado
 */
async function updateArte(req, res){

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
        const tempArteObject = {
            idArte: req.body.idArte,
            añoCreacion: req.body.añoCreacion,
            idTipoArte: req.body.idTipoArte,
            idPiezaArte: req.body.idPiezaArte
        }

        console.log(tempArteObject);

        if(!tempArteObject.idArte){
            res.send(
                {
                    message:"Debe ingresar el id del arte que desea actualizar"
                }
            );
        }else{

            /**
             * validar si arte existe
             */
 
            const Arte = await dbManager.Arte.findOne(
                {
                    where: {
                        idArte: tempArteObject.idArte
                    }
                }
            );

            if(!Arte){
                res.send(
                    {
                        message:"El arte que desea modificar no existe"
                    }
                );
            }else{

                /**
                * updates arte 
                * 
                */

            

                //año creacion
                if(!tempArteObject.añoCreacion){
                    console.log("no actualizo año creacion");
                }else{
                    await Arte.update({ añoCreacion: tempArteObject.añoCreacion}, {
                        where: {
                            idArte: tempArteObject.idArte
                        }
                    });
                }

                /**
                 * llave foranea tipo Arte
                 */

                if(!tempArteObject.idTipoArte){
                    console.log("no actualizo el tipo de arte");
                }else{

                    //validar si el tipo de arte existe
                    const tipoArte = await dbManager.TipoArte.findOne(
                    {
                        where: {
                          idTipoArte: tempArteObject.idTipoArte
                        }
                    }
                );

                    //validar llave foranea
                    if(!tipoArte){
                        res.status(400).send({
                            message: "El tipo de arte no existe (llave foranea)"
                        });
                        return;
                    }else{
                        await Arte.update({ idTipoArte: tempArteObject.idTipoArte}, {
                            where: {
                                idArte: tempArteObject.idArte
                            }
                        });
                    }

                }



                /**
                * llave foranea pieza arte
                */

                if(!tempArteObject.idPiezaArte){
                    console.log("no actualizo la pieza de arte");
                }else{

                    //validar si pieza de arte existe
                    const piezaArte = await dbManager.PiezaArte.findOne(
                        {
                            where: {
                                idPiezaArte: tempArteObject.idPiezaArte
                            }
                        }
                    );

                    //validar llave foranea
                    if(!piezaArte){
                        res.status(400).send({
                            message: "La pieza de arte no existe (llave foranea)"
                        });
                        return;
                    }else{
                        await Arte.update({ idPiezaArte: tempArteObject.idPiezaArte}, {
                            where: {
                                idArte: tempArteObject.idArte
                            }
                        });
                    }

                }

                /**
                * retornar objeto actualizado
                */
                try {

                    const arteUpdate = await dbManager.Arte.findOne(
                        {
                            where: {
                                idArte: tempArteObject.idArte
                            }
                        }
                    );
                    res.json(arteUpdate);
                } catch (error) {
                    res.status(500).send(
                        {
                            message: "Error en servidor al cambiar arte "
                        }
                    );
                }
            }

        }
    }
}




exports.crearArte = crearArte;

exports.getArtes = getArtes;

exports.getArteById = getArteById;

exports.eliminarArteById = eliminarArteById;

exports.updateArte = updateArte;



