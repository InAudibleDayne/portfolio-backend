const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const { restart } = require('nodemon');
const formidable = require('formidable');

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json({portfolio_items: posts});
    }catch(err){
        res.json({ message: err })
    }
});

router.post('/post', async (req, res) => {
    var form = formidable({ multiples: true })
    const parsedForm = form.parse(req, async (err, fields, files) => {
        files.banner_image.path = '../uploads/' +  files.banner_image.name
        files.thumb_image.path = '../uploads/' +  files.thumb_image.name
        files.logo.path = '../uploads/' +  files.logo.name
        const banner_image_path = files.banner_image.path;
        const thumb_image_path = files.thumb_image.path;
        const logo_path = files.logo.path;
        console.log(banner_image_path, thumb_image_path, logo_path);
        const post = new Post({
            name: fields.name,
            description: fields.description,
            category: fields.category,
            tags: fields.tags,
            thumb_image_url: thumb_image_path || '',
            logo_url: logo_path || '',
            banner_image_url: banner_image_path || '',
            url: fields.url
        });
        try{
        const savedPost = await post.save();
        res.json({portfolio_item: savedPost});
        }catch(err){
            res.json({ message: `${err}` });
        }
    });
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
        const removedPost = await Post.deleteOne({ _id: req.params.postId })
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

router.delete('/deleteAll', async(req, res)=>{
    try {
        const deleteAll = await Post.deleteMany({});
        res.json(deleteAll);
    }catch(err){
        res.json({message: `${err}`});
    }
})

module.exports = router;