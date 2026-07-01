const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// GET signup
router.get('/signup', (req, res) => res.render('signup', { error: null }));

// POST signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });
    res.redirect('/login');
  } catch (err) {
    res.render('signup', { error: 'Username or email already exists' });
  }
});

// GET login
router.get('/login', (req, res) => res.render('login', { error: null }));

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { error: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  req.session.username = user.username;
  req.session.save((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;