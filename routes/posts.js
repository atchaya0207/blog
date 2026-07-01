const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

// Create a new post
router.post('/posts', authMiddleware, async (req, res) => {
  try {
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.session.userId
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Edit post page
router.get('/edit/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.session.userId.toString()) {
      return res.redirect('/');
    }
    res.render('edit', { post });
  } catch (err) {
    res.redirect('/');
  }
});

// Update post
router.post('/edit/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.session.userId.toString()) {
      return res.redirect('/');
    }
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// Delete post
router.post('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.session.userId.toString()) {
      return res.redirect('/');
    }
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// Profile page
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.session.userId }).sort({ createdAt: -1 });
    res.render('profile', { posts, username: req.session.username });
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;