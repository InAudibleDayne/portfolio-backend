const express = require('express');

const app = express();

app.use('/posts', () => {
    console.log('This is a middleware running')
})

app.get('/', (req,res) => {
    res.send('server running')
})

app.listen(8080);