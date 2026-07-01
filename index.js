require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authMiddleware = require('./middleware/auth');
const Post = require('./models/Post');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const MongoStore = require('connect-mongo')(session);

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    app.use((req, res, next) => {
      res.locals.user = req.session.username || null;
      next();
    });

    app.use('/', require('./routes/auth'));
    app.use('/', require('./routes/posts'));

    app.get('/', authMiddleware, async (req, res) => {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate('author', 'username');

      const postsWithAuthor = posts.map(post => ({
        ...post.toObject(),
        authorName: post.author ? post.author.username : 'Unknown'
      }));

      res.render('index', {
        posts: postsWithAuthor,
        currentUserId: req.session.userId.toString()
      });
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('DB connection error:', err));