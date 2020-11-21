const Sequelize = require('sequelize');

const sequelizeConnection = require("./db.connection");


/**
 * importar modelos
 */
// Modulo Información
const ReligionModel = require("../models/religion.model");
const TipoArteModel = require("../models/tipoarte.model");
const PiezaArteModel = require("../models/piezaarte.model");
const DiosModel = require("../models/dioses.model");
const ArteModel = require("../models/artes.model");
const UbicacionModel = require("../models/ubicacion.model");
const EstiloVidaModel = require("../models/estilovida.model");
const RegistroTemporalModel = require("../models/registrotemporal.model");
const CivilizacionesModel = require("../models/civilizaciones.model");
// Modulo Evaluaciones
const DificultadesModel = require("../models/dificultades.model");
const CrucigramaModel = require("../models/crucigrama.model");
const QuizModel = require("../models/quiz.model");
const PreguntaCrucigramaModel = require("../models/preguntas_crucigrama.model");
const BancoDePreguntasModel = require("../models/bancos_de_preguntas.model");
const PreguntaQuizModel = require("../models/preguntas_quiz.model");
// Modulo Actividades
const ActividadesModel = require("../models/actividades.model");
const RompecabezasModel = require("../models/rompecabezas.model");
const PiezasModel = require("../models/piezas.model");



 /**
 * crear modelos *******************************************************
 */
// Modulo Información
const Religion = ReligionModel(sequelizeConnection, Sequelize);
const TipoArte = TipoArteModel(sequelizeConnection, Sequelize);
const PiezaArte = PiezaArteModel(sequelizeConnection, Sequelize);
const Dios = DiosModel(sequelizeConnection, Sequelize);
const Arte = ArteModel(sequelizeConnection, Sequelize);
const Ubicacion = UbicacionModel(sequelizeConnection, Sequelize);
const EstiloVida = EstiloVidaModel(sequelizeConnection, Sequelize);
const RegistroTemporal = RegistroTemporalModel(sequelizeConnection, Sequelize);
const Civilizacion = CivilizacionesModel(sequelizeConnection, Sequelize);
// Modulo Evaluaciones
const Dificultades = DificultadesModel(sequelizeConnection, Sequelize);
const Crucigrama = CrucigramaModel(sequelizeConnection, Sequelize);
const Quiz = QuizModel(sequelizeConnection, Sequelize);
const PreguntaCrucigrama = PreguntaCrucigramaModel(sequelizeConnection, Sequelize);
const BancoDePreguntas = BancoDePreguntasModel(sequelizeConnection, Sequelize);
const PreguntaQuiz = PreguntaQuizModel(sequelizeConnection, Sequelize);
// Modulo Actividades
const Actividades = ActividadesModel(sequelizeConnection, Sequelize);
const Rompecabezas = RompecabezasModel(sequelizeConnection, Sequelize);
const Piezas = PiezasModel(sequelizeConnection, Sequelize);

 /**
 * Relaciones **********************************************************
 */

/**
 * Relaciones tabla dios  ************************
 */

 //relacion Religion - Dios
Religion.hasMany(Dios, { 
    foreignKey: 'idReligion',
    onDelete : 'CASCADE',
});


Dios.belongsTo (Religion, {
    foreignKey:'idReligion',
    onDelete : 'CASCADE',
});


/**
 * Relaciones tabla artes ************************
 */


//relacion artes-tipoArte
TipoArte.hasMany(Arte, { 
    foreignKey: 'idTipoArte',
    allowNull: false,
    onDelete : 'CASCADE'
    
    
});

Arte.belongsTo (TipoArte, {
    foreignKey:'idTipoArte',
    allowNull: false,
    onDelete : 'CASCADE'

});


//relacion artes-PiezaArte

PiezaArte.hasMany(Arte, { 
    foreignKey: 'idPiezaArte',
    allowNull: false,
    onDelete : 'CASCADE'
    
    
});

Arte.belongsTo (PiezaArte, {
    foreignKey:'idPiezaArte',
    allowNull: false,
    onDelete : 'CASCADE'

});


/**
 * relaciones tabla civilizaciones********************
 */

 //relacion religion-civilizacion
Religion.hasMany(Civilizacion, { 
    foreignKey: 'idReligion',
    onDelete : 'CASCADE',
});

Civilizacion.belongsTo (Religion, {
    foreignKey:'idReligion',
    onDelete : 'CASCADE',
});


 //relacion ubicacion-civilizacion
 Ubicacion.hasMany(Civilizacion, { 
    foreignKey: 'idUbicacion',
    onDelete : 'CASCADE',
});

Civilizacion.belongsTo (Ubicacion, {
    foreignKey:'idUbicacion',
    onDelete : 'CASCADE',
});


 //relacion estilosVida-civilizacion
 EstiloVida.hasMany(Civilizacion, { 
    foreignKey: 'idEstiloVida',
    onDelete : 'CASCADE',
});

Civilizacion.belongsTo (EstiloVida, {
    foreignKey:'idEstiloVida',
    onDelete : 'CASCADE',
});

 //relacion registrosTemporales-civilizacion
 RegistroTemporal.hasMany(Civilizacion, { 
    foreignKey: 'idRegistroTemporal',
    onDelete : 'CASCADE',
});

Civilizacion.belongsTo (RegistroTemporal, {
    foreignKey:'idRegistroTemporal',
    onDelete : 'CASCADE',
});

 //relacion artes-civilizacion
 Arte.hasMany(Civilizacion, { 
    foreignKey: 'idArte',
    onDelete : 'CASCADE',
});

Civilizacion.belongsTo (Arte, {
    foreignKey:'idArte',
    onDelete : 'CASCADE',
});

//relacion civilizacion - bancos_de_preguntas
Civilizacion.hasMany(BancoDePreguntas, { 
    foreignKey: 'idCivilizacion',
    onDelete : 'CASCADE',
});

BancoDePreguntas.belongsTo (Civilizacion, {
    foreignKey:'idCivilizacion',
    onDelete : 'CASCADE',
});

// RELACIONES MODULO EVALUACIONES

/**
 * Relaciones tabla preguntas_crucigrama  ************************
 */

 //relacion crucigrama - preguntas_crucigrama
 Crucigrama.hasMany(PreguntaCrucigrama, { 
    foreignKey: 'idCrucigrama',
    onDelete : 'CASCADE',
});

PreguntaCrucigrama.belongsTo (Crucigrama, {
    foreignKey:'idCrucigrama',
    onDelete : 'CASCADE',
});

/**
 * Relaciones tabla preguntas_quiz  ************************
 */
 //relacion quiz - preguntas_quiz
 Quiz.hasMany(PreguntaQuiz, { 
    foreignKey: 'idQuiz',
    onDelete : 'CASCADE',
});

PreguntaQuiz.belongsTo (Quiz, {
    foreignKey:'idQuiz',
    onDelete : 'CASCADE',
});

/**
 * Relaciones tabla banco_de_preguntas  ************************
 */

 //relacion dificultades - banco_de_preguntas
 Dificultades.hasMany(BancoDePreguntas, { 
    foreignKey: 'idDificultad',
    onDelete : 'CASCADE',
});

BancoDePreguntas.belongsTo (Dificultades, {
    foreignKey:'idDificultad',
    onDelete : 'CASCADE',
});

 //relacion banco_de_preguntas - preguntas_crucigrama
 BancoDePreguntas.hasMany(PreguntaCrucigrama, { 
    foreignKey: 'idBancoPreguntas',
    onDelete : 'CASCADE',
});

PreguntaCrucigrama.belongsTo(BancoDePreguntas, {
    foreignKey:'idBancoPreguntas',
    onDelete : 'CASCADE',
});

 //relacion banco_de_preguntas - preguntas_quiz
 BancoDePreguntas.hasMany(PreguntaQuiz, { 
    foreignKey: 'idBancoPreguntas',
    onDelete : 'CASCADE',
});

PreguntaQuiz.belongsTo(BancoDePreguntas, {
    foreignKey:'idBancoPreguntas',
    onDelete : 'CASCADE',
});

//relacion civilizaciones - actividades
Civilizacion.hasMany(Actividades, { 
    foreignKey: 'idCivilizacion',
    onDelete : 'CASCADE',
});

Actividades.belongsTo(Civilizacion, {
    foreignKey:'idCivilizacion',
    onDelete : 'CASCADE',
});


//relacion actividades - rompecabezas
Actividades.hasMany(Rompecabezas, { 
    foreignKey: 'idActividad',
    onDelete : 'CASCADE',
});

Rompecabezas.belongsTo(Actividades, {
    foreignKey:'idActividad',
    onDelete : 'CASCADE',
});

//relacion rompecabezas - piezas
Rompecabezas.hasMany(Piezas, { 
    foreignKey: 'idRompecabezas',
    onDelete : 'CASCADE',
});

Piezas.belongsTo(Rompecabezas, {
    foreignKey:'idRompecabezas',
    onDelete : 'CASCADE',
});

const db = {
    // Modulo Información
    Religion,
    Dios,
    TipoArte,
    PiezaArte,
    Arte,
    Ubicacion,
    EstiloVida,
    RegistroTemporal,
    Civilizacion,
    // Modulo Evaluaciones
    Dificultades,
    Crucigrama,
    Quiz,
    PreguntaCrucigrama,
    BancoDePreguntas,
    PreguntaQuiz,
    // Modulo Actividades
    Actividades,
    Rompecabezas,
    Piezas,
    sequelizeConnection 
}

module.exports = db;