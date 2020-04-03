const express = require('express');
const router = express.Router();
// const sanitize = require('mongo-sanitize');

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {

  try {
    const result = await Post
      .find({ status: 'published' })
      .select('author created title image status')
      .sort({ created: -1 });
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {

  try {
    let fileName;

    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    const newPost = new Post({ ...req.fields, image: fileName });
    await newPost.save();

    res.json(newPost);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id', async (req, res) => {
  const { author, title, content, price, phone, location, updated } = req.fields;

  console.log('req', req);

  try {

    let fileName;

    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) res.status(404).json({ message: 'Post not found...' });
    else {
      post.author = author;
      post.title = title;
      post.content = content;
      post.price = price;
      post.phone = phone;
      post.location = location;
      post.image = fileName;
      post.updated = updated;
      await post.save();
      res.json(post);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
