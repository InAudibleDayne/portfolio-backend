const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('We are on Posts');
});

router.get('/:id', (req, res) => {
    res.send('Specific post');
});

module.exports = router;