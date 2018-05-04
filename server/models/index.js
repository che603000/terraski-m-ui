const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {db} = require('../config')

require('./task');

const conn = mongoose.connect(db, {useMongoClient: true})
    .then(() => {
        const {host, port, name} = mongoose.connections[0];
        console.log(`Connection mongodb  => ${host}:${port}/${name}`)
    })
    .catch(err => console.log(err));

module.exports = conn;