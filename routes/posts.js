const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const { restart } = require('nodemon');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({ message: err })
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({ message: err });
    }
})

router.get('/:postId', async(req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

router.delete('/:postId', async (req, res)=> {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.json(removedPost);
    }catch(err){
        res.json({messsage: err});
    }
})

module.exports = router;