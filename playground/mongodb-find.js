// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


// con el /TodoApp ya nos conectamos a la db. Si le insrtamos algo se crea.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB Server, Error:', err);
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');


    // Le aplico un filtro
    // db.collection('Todos').find({lula: "lo"}).toArray()
    // .then(res=>console.log(JSON.stringify(res, undefined, 2)))
    // .catch(e=>console.log('Error: ', e));


    // Encuentra todos
    // db.collection('Todos').find({}).toArray()
    // .then(res=>console.log(JSON.stringify(res, undefined, 2)))
    // .catch(e=>console.log('Error: ', e));


    // Así se busca por un id, porque el _id es un ObjectID, no es un string.
    db.collection('Todos').find({_id : new ObjectID("5bc3bb02c00986cdd54acf94")}).toArray()
    .then(res=>console.log(JSON.stringify(res, undefined, 2)))
    .catch(e=>console.log('Error: ', e));


    // Así se busca por un id, porque el _id es un ObjectID, no es un string. Y ademas le aplique un contador
    db.collection('Todos').find({_id : new ObjectID("5bc3bb02c00986cdd54acf94")}).count()
    .then(res=>console.log(JSON.stringify(res, undefined, 2)))
    .catch(e=>console.log('Error: ', e));


    // client.close();
});