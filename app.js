const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

app.use('/posts', () => {
    console.log('This is a middleware running')
});

app.get('/', (req,res) => {
    res.send('server running')
});

//Connection test
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true }, () => {
    console.log('connected to DB!');
})

app.listen(8080);