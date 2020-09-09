const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Auth', AuthSchema);