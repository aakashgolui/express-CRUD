import express from "express";

const router = express.Router();

let posts = [
  {
    id: 1,
    title: "Post one",
  },
  {
    id: 2,
    title: "Post two",
  },
  {
    id: 3,
    title: "Post three",
  },
];

//get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

//get post by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    const error = new Error("No post found with this id");
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

// Add new post
router.post("/", (req, res, next) => {
  const title = req.body.title;

  if (!title || title === "") {
    const error = new Error("Please provide a valid title");
    error.status = 400;
    return next(error);
  }

  posts.push({
    id: posts.length + 1,
    title,
  });

  res.status(201).json({
    msg: "New post created!",
    posts: posts,
  });
});

//Update post
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex < 0) {
    const error = new Error(`A post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  if (!title || title === "") {
    const error = new Error("Please provide a valid title");
    error.status = 400;
    return next(error);
  }

  posts[postIndex].title = title;

  res.status(200).json({ msg: "Post updated!", post: posts[postIndex] });
});

//Delete post
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex < 0) {
    const error = new Error(`A post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }

  posts.splice(postIndex, 1);

  res.status(200).json({
    msg: `Post with id:${id} is deleted!`,
    posts: posts,
  });
});

export default router;
