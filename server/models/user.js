const mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// let newUser = new User({
//     email: 'mati@mati.com'
// });

// newUser.save()
//     .then(res => console.log(JSON.stringify(res, undefined, 2)))
//     .catch(e => console.log('Error: ', e));


module.exports = {
    User
}