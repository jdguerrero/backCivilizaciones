const { EstiloVida } = require("../dataBase/db.manager");
const dbManager = require("../dataBase/db.manager");


/**
 * Crea un estilo de vida en la base de datos y la retorna
 * @param {*} req : objeto json con atributos para nuevo estilo de vida
 * @param {*} res : crea la consultar sql e inserta el nuevo registro, adicional retorna el objeto creado
 */
function crearEstiloVida (req, res){

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
        const newEstiloVidaObject = {
            descripcionEstiloVida: req.body.descripcionEstiloVida,
            imagenEstiloVida: req.body.imagenEstiloVida
        }

        /**
         * insert nuevo Propietario
         */
        dbManager.EstiloVida.create(newEstiloVidaObject).then(
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
 * devuelve todas los estilos de vida
 * @param {*} req petición
 * @param {*} res: retorna un objeto Json con todas los estilos de vida
 */
async function getEstilosVida(req, res){

    try {

        const estilosVida = await dbManager.EstiloVida.findAll();
        res.json(
            {
                data: estilosVida
            }
        );
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al listar estilos de vida"
            }
        );
    }
}


/**
 * Busca un estilo de vida por su campo idEstiloVida
 * @param {*} req: idEstiloVida del estilo de vida que se desea buscar
 * @param {*} res: Objeto Json con datos del estilo de vida encontrado
 */
async function getEstiloVidaById(req, res){

    try {

        const {idEstiloVida} = req.params;

        const estiloVida = await dbManager.EstiloVida.findOne(
            {
                where: {
                    idEstiloVida: idEstiloVida
                }
            }
        );
        res.json(estiloVida);
    } catch (error) {
        res.status(500).send(
            {
                message: "Error en servidor al buscar estilo de vida"
            }
        );
    }
}

/**
 * Elimina un estilo de vida por su idEstiloVida
 * @param {*} req idEstiloVida del estilo de vida que se desea borrar
 * @param {*} res Mensaje informativo
 */
async function deleteEstiloVidaById(req, res){

    try{

        const {idEstiloVida} = req.params;

        const estiloVida = await dbManager.EstiloVida.findOne(
            {
                where: {
                    idEstiloVida: idEstiloVida
                }
            }
        );

        if(!estiloVida) {
            res.send(
                {
                    message:"El estilo de vida no existe"
                }
            );
        }else{

            await EstiloVida.destroy({
                where: {
                  idEstiloVida: idEstiloVida
                }
            });
    
            res.send(
                {
                    message:"Estilo de vida eliminado"
                }
            );

        }
        
    }catch(error){
        res.status(500).send(
            {
                message: "Error en servidor al eliminar estilo de vida"
            }
        );
    }

}


exports.crearEstiloVida = crearEstiloVida;

exports.getEstilosVida = getEstilosVida;

exports.getEstiloVidaById = getEstiloVidaById;

exports.deleteEstiloVidaById = deleteEstiloVidaById;