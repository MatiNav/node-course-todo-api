const expect = require('expect');
const request = require('supertest');
// Acordarse que el que devuelve que el test anduvo o le fue mal es el done() o el done(error) (pero no siempre que
// tira error es porque se mando el done(error))


const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { ObjectID } = require('mongodb');

const todos = [{
    text: 'First text todo'
}, {
    text: 'Second text todo'
}]


beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done());
});


describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        const text = 'Test todo text';


        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch(e => done(e));
            });
    });


    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({ text: '' })
            .expect(400)
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch(e => done(e));

            })

    });

});


describe('GET /todos', ()=>{

    it('should get all todos', (done)=>{

        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)

    });

});


describe('GET /todos/:id', ()=>{

    it('should return todo doc', (done)=>{

        Todo.findOne()
        .then(todo=>{

            if(!todo){
                return done(new Error('No hay todos !!'))
            }

            request(app)
            .get('/todos/' + todo._id.toHexString()) // convierte el OjectID a un string
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(todo._id.toHexString())
            })
            .end(done)


        })
        .catch(e=> done(e));

    });


    it('should return 400 with wrong id', (done)=>{

        request(app)
        .get('/todos/asda,')
        .expect(400)
        .expect((res)=>{
            expect(res.body.error).toBe('Wrong id')
        })
        .end(done)


    });


    it('should return 400 with not found msg', (done)=>{

        request(app)
        .get('/todos/' + new ObjectID().toHexString())
        .expect(400)
        .expect((res)=>{
            expect(res.body.error).toBe('Any Todo was found !!')
        })
        .end(done)


    });


});