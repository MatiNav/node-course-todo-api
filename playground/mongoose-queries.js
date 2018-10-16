const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { ObjectID } = require('mongodb');

let id = '5bc60928c00986cdd54b146c';

console.log(`El id es valido ? ${ObjectID.isValid(id)}`);


// devuelve un array
Todo.find({ _id: id })
    .then(res => console.log(res))
    .catch(e => console.log(e));


// devuelve un objeto
Todo.findOne({ _id: id })
    .then(res => console.log(res))
    .catch(e => console.log(e));


// devuelve un objeto pero solo buscando por id
Todo.findById(id)
    .then(res => console.log(res))
    .catch(e => console.log(e));


Todo.findByIdAndDelete(id)
    .then(res => console.log('Delete', res))
    .catch(e => console.log(e));