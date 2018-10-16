const express = require('express');
// Body parser se usa para que al mandar un body al server lo pueda interpretar como un json
const bodyParser = require('body-parser');


const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { ObjectID} = require('mongodb');


const app = express();
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(doc => res.send(doc))
        .catch(e => res.status(400).send(e));
});


app.get('/todos', (req, res)=>{

    Todo.find()
    .then(todos=>{
        res.send({todos});
    })
    .catch(e=>{
        res.status(400).send(e);
    })

});

app.get('/todos/:id', (req, res)=>{

    const id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(400).send({error: 'Wrong id'});        
    }

    Todo.findById(id)
    .then(todo=>{

        if(!todo){
            return res.status(400).send({error: 'Any Todo was found !!'});        
        }

        res.send({todo});
    })
    .catch(e=>{
        res.status(400).send(e);
    })

});


const PORT = process.env.PORT ||  3002;

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
})


module.exports = {
    app
}

