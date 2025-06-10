import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

//get all posts
router.get("/", getPosts);

//get post by id
router.get("/:id", getPost);

// Add new post
router.post("/", createPost);

//Update post
router.put("/:id", updatePost);

//Delete post
router.delete("/:id", deletePost);

export default router;
