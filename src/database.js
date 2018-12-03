const mongoose = require ('mongoose');
const { mongodb} = require('./Keys');

mongoose.connect(mongodb.URi, {})
    .then(db => console.log('Database is connect'))
    .catch(err => console.error(err));