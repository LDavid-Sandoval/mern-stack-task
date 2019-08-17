const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:Admin@mern-task-fhxxi.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
module.exports = mongoose;