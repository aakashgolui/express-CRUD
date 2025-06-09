import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, 'public')))
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
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

//get post by id
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return res.status(404).json({
      msg: "No post found with this id",
    });
  }

  res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}"`);
});
