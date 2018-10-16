const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { ObjectID} = require('mongodb');

let id = '5bc52ce33677b824fd8db5a7';

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