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
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return res.status(404).json({
      msg: "No post found with this id",
    });
  }

  res.status(200).json(post);
});

// Add new post
router.post("/", (req, res) => {
  const title = req.body.title;

  if (!title || title === "") {
    return res.status(400).json({
      msg: "Please provide a valid title",
    });
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
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex < 0)
    return res.status(404).json({ msg: `A post with ${id} not found` });

  if (!title || title === "") {
    return res.status(400).json({
      msg: "Please provide a valid title",
    });
  }

  posts[postIndex].title = title;

  res.status(200).json({ msg: "Post updated!", post: posts[postIndex] });
});

//Delete post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex < 0)
    return res.status(404).json({ msg: `A post with ${id} not found` });

  posts.splice(postIndex, 1);

  res.status(200).json({
    msg: `Post with id:${id} is deleted!`,
    posts: posts,
  });
});

export default router;
