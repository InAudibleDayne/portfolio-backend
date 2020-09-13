const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
require('dotenv/config');

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}

//Middlewaress
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/posts/post', formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: 'uploads/',
    multiples: true
}))

const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

app.use('/posts', postsRoute);
app.use('/auth', authRoute);
app.use(express.static('uploads'));

app.get('/', (req,res) => {
    res.send('server running')
});

//Connection test
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true , useUnifiedTopology: true }, () => {
    console.log('connected to DB!');
})

app.listen(8080);