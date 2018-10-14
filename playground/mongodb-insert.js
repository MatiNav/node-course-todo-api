// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


// con el /TodoApp ya nos conectamos a la db. Si le insrtamos algo se crea.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB Server, Error:', err);
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');


    // db.collection('Todos').insertOne({ 
    //     text: 'loco',
    //     completed: false
    // },(err, res)=>{

    //     if (err) {
    //         return console.log('Unable to insert todo, Error:', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Matias',
    //     age: 23,
    //     location: 'Buenos Aires'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo, Error:', err);
    //     }
       
    //     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2)); 
    // });


    // client.close();
});