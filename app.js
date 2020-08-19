const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Authorization'
}

//Middlewaress
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

app.get('/', (req,res) => {
    res.send('server running')
});

//Connection test
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true }, () => {
    console.log('connected to DB!');
})

app.listen(8080);