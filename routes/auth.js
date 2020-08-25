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

router.post('/', (req, res) => {
    const authTokens = {};
    const { email, password } = req.body.client;
    const hashedPassword = getHashedPassword(password);

    if (email === process.env.SECRET_USER && hashedPassword === process.env.SECRET_PWD){
        const authToken = generateAuthToken();

        authTokens[authToken] = email;
        res.cookie('AuthToken', authToken);
        res.json({status: 'created'})
    } else {
        res.json({status: 'invalid credentials'})
    }
});

module.exports = router;