// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


// con el /TodoApp ya nos conectamos a la db. Si le insrtamos algo se crea.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB Server, Error:', err);
    }

    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');


    // //delete Many
    // db.collection('Todos').deleteMany({completed: false})
    // .then(res=>console.log('Success: ', res))
    // .catch(e=>console.log('Error: ', e));


    // //delete One
    // db.collection('Todos').deleteOne({text: "loco"})
    // .then(res=>console.log('Success: ', res))
    // .catch(e=>console.log('Error: ', e));


    // //findneAndDelete
    // db.collection('Todos').findOneAndDelete({completed:false})
    // .then(res=>console.log('Success: ', res))
    // .catch(e=>console.log('Error: ', e));

    //delete One By Id
    db.collection('Todos').findOneAndDelete({_id: new ObjectID("5bc3bb02c00986cdd54acf94")})
    .then(res=>console.log('Success: ', res))
    .catch(e=>console.log('Error: ', e));

    // client.close();
});