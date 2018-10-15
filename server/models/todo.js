const mongoose = require('mongoose');


let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});


// let newTodo = new Todo({
//     text: 234,
// });

// newTodo.save()
//     .then(res => console.log(JSON.stringify(res, undefined, 2)))
//     .catch(e => console.log('Error: ', e));


module.exports = {
    Todo
}