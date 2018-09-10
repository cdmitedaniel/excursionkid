var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const helmet = require('helmet')
const frameguard = require('frameguard')

var routes = require('./routes/index');
var usuarios = require('./routes/usuarios');
var excursiones = require('./routes/excursiones');
var capitulos = require('./routes/capitulos');
var preguntas = require('./routes/preguntas');
var iniciar = require('./routes/iniciar');
var tareas = require('./routes/tareas');

var login = require('./routes/login');
var app = express();

app.use(helmet())
app.use(frameguard({
  action: 'allow-from',
  domain: 'https://www.youtube.com'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const hbs = require('hbs');

hbs.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/excursiones', excursiones);
app.use('/capitulos', capitulos);
app.use('/preguntas', preguntas);
app.use('/login', login);
app.use('/iniciar', iniciar);
app.use('/tareas', tareas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
