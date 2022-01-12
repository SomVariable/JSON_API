const {Schema, model} = require("mongoose")

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    sex: {type: String, required: true},
    city:{type: String, required: true},
    avatar: {type: String, required: true},
    follow: [{type: Number}]
})

module.exports = model('User', User)