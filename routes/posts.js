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
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        thumb_image_url: req.body.thumb_image_url,
        logo_url: req.body.logo_url,
        banner_image_url: req.body.banner_image_url,
        url: req.body.url
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

router.patch('/:postId', async(req, res) => {
    try{
    const updatePost = Post.updateOne(
        { _id: req.params.postId}, 
        { $set: 
            {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                tags: req.body.tags,
                thumb_image_url: req.body.thumb_image_url,
                logo_url: req.body.logo_url,
                banner_image_url: req.body.banner_image_url,
                url: req.body.url
            }
        });
    res.json(updatePost)
    }catch(err){
        res.json({message: err})
    };
})

router.get('/filter/:category', async(req, res)=>
{
    try {
        const postByCategory = await Post.find({category: req.params.category});
        res.json(postByCategory);
    }catch(err){
        res.json({message: err});
    };
})

module.exports = router;