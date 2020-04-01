const express = require('express');
const router = express.Router();
const sanitize = require('mongo-sanitize');

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
    const cleanedBody = sanitize(req.body);
    const { author, created, updated, status, title, content, image, price, phone, location } = cleanedBody;

    const newPost = new Post({
      author: author,
      created: created,
      updated: updated,
      status: status,
      title: title,
      content: content,
      image: image,
      price: price,
      phone: phone,
      location: location,
    });

    await newPost.save();
    res.json(newPost);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
