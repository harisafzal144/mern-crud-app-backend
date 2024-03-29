const Post = require("../models/post");
const slugify = require("slugify");

//these ar controller methods

exports.create = (req, res) => {
  console.log(req.body);

  const { title, content, user } = req.body;

  const slug = slugify(title);

  //validate

  switch (true) {
    case !title:
      return res.status(400).json({ error: "Title is Required" });
      break;
    case !content:
      return res.status(400).json({ error: "Content is Required" });
      break;
  }

  //create post
  Post.create({ title, content, user, slug }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Duplicate post. Try another title" });
    }

    res.json(post);
  });
  // res.json({ message: "see your server console" });
};

//get or read all posts
exports.allPosts = (req, res) => {
  Post.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((error, posts) => {
      if (error) console.log(error);
      res.json(posts);
    });
};

//get or read single post
exports.readPost = (req, res) => {
  const { slug } = req.params;

  console.log(slug, " slug");
  Post.findOne({ slug }).exec((error, post) => {
    if (error) console.log(error);
    res.json(post);
  });
};

//update post

exports.updatePost = (req, res) => {
  const { slug } = req.params;
  const { title, content, user } = req.body;

  Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec(
    (error, post) => {
      if (error) console.log(error);
      res.json(post);
    }
  );
};

//Delete Post

exports.deletePost = (req, res) => {
  const { slug } = req.params;

  Post.findOneAndRemove({ slug }).exec((error, post) => {
    if (error) console.log(error);
    res.json({
      message: "Post Deleted",
    });
  });
};
