import express from "express";
import bodyParser from "body-parser";

const app = express();
const port=3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // We'll store blog posts here temporarily

app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// Post creation route
app.post('/compose', (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(newPost);
  res.redirect('/');
});

// Route to show edit form
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post: post });
});

// Route to handle update
app.post('/update/:id', (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  posts[index].title = req.body.postTitle;
  posts[index].content = req.body.postBody;
  res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});