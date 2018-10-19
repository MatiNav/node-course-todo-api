const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail, // es lo mismo que (value)=> validator.isEmail(value)
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        minlength: 6,
        require: true
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

// Este metodo ya existe pero lo sobreescribe para mandar esto desp. Copado.
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj, ["email","_id"]);
}



UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123');

    user.tokens = user.tokens.concat([{
        access,
        token
    }]);

    return user.save()
    .then(()=>token)
    .catch((e)=>e);
};

const User = mongoose.model('User', UserSchema);


module.exports = {
    User
}