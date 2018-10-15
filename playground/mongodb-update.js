
    // const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


// con el /TodoApp ya nos conectamos a la db. Si le insrtamos algo se crea.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB Server, Error:', err);
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({mati: "el MAS kapo"}, { $set: {mati: "el MAS kapo"}, $inc: {age: 5}})
    .then(res=>console.log(JSON.stringify(res, undefined, 2)))
    .catch(e=>console.log('Error: ', e));


    // client.close();
});