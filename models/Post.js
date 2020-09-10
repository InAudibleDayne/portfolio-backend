const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    thumb_image_url: {
        type: String,
    },
    logo_url: {
        type: String
    },
    banner_image_url: {
        type: String,
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Posts', PostSchema);