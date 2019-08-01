const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');

const app = express();
//SETTINGS
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/tasks', require('./routes/task.routes'));
//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the serve
app.listen(app.get('port'), () => {
    console.log(`server on Port ${app.get('port')}`);
});