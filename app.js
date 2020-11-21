var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



/**
 * importar enrutadores
 */


var indexRouter = require('./routes/index');
var religionRouter = require('./routes/religion.route');
var diosRouter = require('./routes/dios.route')
var tipoArteRouter = require('./routes/tipoarte.route');
var piezaArteRouter = require('./routes/piezaarte.route');
var arteRouter = require('./routes/artes.route');
var ubicacionRouter = require('./routes/ubicacion.route');
var estiloVidaRouter = require('./routes/estilovida.route');
var registroTemporalRouter = require('./routes/registrotemporal.route');
var civilizacionesRouter = require('./routes/civilizaciones.route');
var dificultadRouter = require('./routes/dificultades.route');
var crucigramaRouter = require('./routes/crucigrama.route');
var quizRouter = require('./routes/quiz.route');
var bancoRouter = require('./routes/bancos_de_preguntas.route');
var preguntaCrucigramaRouter = require('./routes/preguntas_crucigrama.route');
var preguntaQuizRouter = require('./routes/preguntas_quiz.route');
var actividadRouter = require('./routes/actividades.route');
var rompecabezasRouter = require('./routes/rompecabezas.route');
var piezaRouter = require('./routes/piezas.route');


const cors = require('cors');

var app = express();


/**
 * importar dbmanager
*/
const dbManager = require ("./dataBase/db.manager")

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/**
 * usar enrutadores
 */

app.use('/api/', indexRouter);
app.use('/api/religion', religionRouter);
app.use('/api/dios', diosRouter);
app.use('/api/tipoarte', tipoArteRouter);
app.use('/api/piezaarte', piezaArteRouter);
app.use('/api/arte', arteRouter);
app.use('/api/ubicacion', ubicacionRouter);
app.use('/api/estilovida', estiloVidaRouter);
app.use('/api/registrotemporal', registroTemporalRouter);
app.use('/api/civilizaciones', civilizacionesRouter);
app.use('/api/dificultad', dificultadRouter);
app.use('/api/crucigrama', crucigramaRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/banco', bancoRouter);
app.use('/api/preguntacrucigrama', preguntaCrucigramaRouter);
app.use('/api/preguntaquiz', preguntaQuizRouter);
app.use('/api/actividad', actividadRouter);
app.use('/api/rompecabezas', rompecabezasRouter);
app.use('/api/pieza', piezaRouter);





/**
 * conexion y creación DB
 */
dbManager.sequelizeConnection.authenticate().then(
  () => {
      console.log("***** Connection has been stablished *******");
      dbManager.sequelizeConnection.sync ().then(
          () => {
              console.log ("Database Synced");
          }
      );
  }
).catch(
  err => {
      console.log("Unable to connect to the database...", err)
  }
);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
