const config=require('config');
const mongoose=require('mongoose');
const express = require('express');
const app= express();
const todos=require('./routes/todos');
const users= require('./routes/users');
const auth= require('./routes/auth');
const Joi=require('joi');

if (!config.get('jwtprivatekey')) {
  console.error('FATAL ERROR: jwtprivatekey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/todosgame')
  .then(()=> console.log('connected to Mongodb'))
  .catch(err => console.error('could not connect to MongoDb'));

app.use(express.json());
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port =process.env.PORT || 6000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

