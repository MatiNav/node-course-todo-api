const express = require('express');
// Body parser se usa para que al mandar un body al server lo pueda interpretar como un json
const bodyParser = require('body-parser');
const _ = require('lodash');
const DB = require('./db/mongoose');

DB.connectDB();

const {
    Todo
} = require('./models/todo');


const {
    User
} = require('./models/user');

const {
    ObjectID
} = require('mongodb');


const app = express();
app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    console.log(req.body.text);
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(doc => res.send(doc))
        .catch(e => res.status(400).send(e));
});


app.get('/todos', (req, res) => {

    Todo.find()
        .then(todos => {
            res.send({
                todos
            });
        })
        .catch(e => {
            res.status(400).send(e);
        })

});

app.get('/todos/:id', (req, res) => {

    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            error: 'Wrong id'
        });
    }

    Todo.findById(id, (err, todo)=>{

            if(err){
                res.send({err}).status(400);
            }

            if (!todo) {
                return res.status(400).send({
                    error: 'Any Todo was found !!'
                });
            }

            res.send({
                todo
            });
        })

});


app.delete('/todos/:id', (req, res) => {

    const _id = req.params.id;

    if (!ObjectID.isValid(_id)) {
        return res.status(400).send({
            error: 'Wrong id'
        });
    }
    Todo.findByIdAndDelete({_id }, function (err, todo) {
            console.log(_id);

            if(err){
                res.status(400).send({err});
            }


            if (!todo) {
                return res.status(400).send({
                    error: 'Any Todo was found !!'
                });
            }

            return res.send({
                todo
            });
        })

});


app.patch('/todos/:id', (req, res) => {

    const id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send({
            error: 'Wrong id'
        });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id}, {
            $set: body
        }, {
            new: true
        })
        .exec()
        .then(todo => {
            console.log(id, body);

            res.send({todo})
        })
        .catch(error => {
            console.log(id, body);

            res.send({
                error
            })
        });



});


/// USER ROUTES /// 

app.post('/users', (req, res)=>{

    const {email, password} = _.pick(req.body, ["email", "password"]);

    if(!email || !password){
        return res.status(400).send({error: 'email and password are required.'});
    }

    const user = new User({
        email,
        password
    })

    user.save()
    .then(doc => {
       return doc.generateAuthToken();
    })
    .then((token)=>{
        if(typeof token === 'string') res.header('x-auth', token).send(user);
    })
    .catch(e => res.status(400).send(e));

});




const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
})


module.exports = {
    app
}


/**
 * Configuracion de Heroku:  *Package.json: script start, engines para versiones específicas
 */