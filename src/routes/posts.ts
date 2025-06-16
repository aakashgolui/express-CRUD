import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/postController.ts';
import { verifyToken } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(verifyToken);

//get all posts
router.get('/', getPosts);

//get post by id
router.get('/:id', getPost);

// Add new post
router.post('/', createPost);

//Update post
router.put('/:id', updatePost);

//Delete post
router.delete('/:id', deletePost);

export default router;
