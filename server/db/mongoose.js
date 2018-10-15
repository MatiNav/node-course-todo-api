const mongoose = require('mongoose');

// Setea que mongoose maneje las promesas de Javascript
mongoose.Promise = global.Promise;


// Se conecta a la base de datos
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } );
//Todas las funciones que haga que dependan que se haya conectado a la db,
// van a ser encoladas por mongoose y cuando se conecte las va a lanzar, lo hace
// todo por detrás lo cual es una de sus ventajas


module.exports = {
    mongoose
}