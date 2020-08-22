const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { restart } = require('nodemon');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

router.post('/', async(req, res) => {
    const { email, password } = req.body;
    
});

module.exports = router;