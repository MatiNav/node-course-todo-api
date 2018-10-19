const mongoose = require('mongoose');

const config = require('./../config/dev');

// Setea que mongoose maneje las promesas de Javascript
mongoose.Promise = global.Promise;

/*
// Se conecta a la base de datos
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } );
//Todas las funciones que haga que dependan que se haya conectado a la db,
// van a ser encoladas por mongoose y cuando se conecte las va a lanzar, lo hace
// todo por detrás lo cual es una de sus ventajas
*/

function connectDB() {
    console.log(config.DB_URL);
    mongoose.connect(config.DB_URL, {
            useNewUrlParser: true
        })
        .then(res => {
            console.log('mongoose connected to: ' + config.DB_URL);
        })
        .catch(e => console.log(e));

    mongoose.set('useCreateIndex', true);
}




module.exports = {
    mongoose,
    connectDB
}