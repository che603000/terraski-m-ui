const  mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    name: {
        type: String
    },
    area: {
        type: Number,
        default: 0
    },
    timeOn: {
        type: String,
        default: "06:00"
    },
    time: {
        type: Number,
        default: 10
    },
    temp: {
        type: Number,
        default: 10
    },
});

const Task = mongoose.model('task', schema);