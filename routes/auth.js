const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const { restart } = require('nodemon');
const Auth = require('../models/Auth');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

router.post('/', async (req, res) => {
    const { email, password } = req.body.client;
    const hashedPassword = getHashedPassword(password);
    if (email === process.env.SECRET_USER && hashedPassword === process.env.SECRET_PWD){
        const authToken = generateAuthToken().toString();

        var authEntry = new Auth({
            user: email,
            authToken: authToken
        });
        try{
            const savedAuth = await authEntry.save();
            res.cookie('AuthToken', authToken);
            res.json({status: 'created'})
        }catch(err){
            res.json({status: `error: ${err}`})
        }
    } else {
        res.json({status: 'invalid credentials'})
    }
});

router.delete('/logout', (req, res) => {
    try {
        const removedAuthToken = Auth.remove();
        res.json({status: 200});
    }catch(err){
        console.log(err)
    }
})

router.get('/logged_in', (req, res) => {
    // NEED TO WRITE AUTH MODEL SO I CAN ACTUALLY QUERY THIS
    // const authCheck = authTokens.filter(authToken => authToken.email === req.body.email);
    // console.log(authCheck);
})

module.exports = router;