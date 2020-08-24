const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { restart } = require('nodemon');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const authTokens = {};

router.get('/', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    if (email === process.env.SECRET_USER && hashedPassword === process.env.SECRET_PWD){
        res.json({message: 'test successful'})
    } else {
        res.json({message: 'error'})
    }
});

module.exports = router;