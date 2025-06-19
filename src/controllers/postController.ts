import { NextFunction, Request, Response } from 'express';
import { Post } from '../models/postModel.ts';
import { findAllPosts, findPostById } from '../services/postService.ts';
import { CustomError, IPostItem } from '../types/index.ts';

/**
 *
 * @param { limit: number } req
 * @param {*} res
 * @returns json with all posts or limited number of posts
 * @description Get all posts or a limited number of posts
 * @route GET /api/posts
 */
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limitParam = req.query?.limit;
    const limit =
      typeof limitParam === 'string' ? parseInt(limitParam, 10) : NaN;

    const posts = await findAllPosts(limit);
    res.status(200).json(posts);
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      const err = new Error((error as Error).message);
      return next(err);
    }
  }
};

/**
 * @param { id: number } req
 * @param {*} res
 * @returns json with a single post
 * @description Get a single post by id
 * @route GET /api/posts/:id
 */
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const post: IPostItem | null = await findPostById(id);

    if (!post) {
      const error: CustomError = new Error('No post found with this ID');
      error.status = 404;
      return next(error);
    }

    res.status(200).json(post);
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      const err: CustomError = new Error((error as Error).message);
      err.status = 500;
      return next(err);
    }
  }
};

/**
 * @param { title: string } req
 * @param {*} res
 * @returns json with the newly created post
 * @description Create a new post
 * @route POST /api/posts
 */
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const title = req.body.title;

  if (!title || title === '') {
    const error: CustomError = new Error('Please provide a valid title');
    error.status = 400;
    return next(error);
  }

  try {
    await Post.create({
      title,
    });

    res.status(201).json({
      msg: 'New post created!',
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      const err: CustomError = new Error((error as Error).message);
      err.status = 500;
      return next(err);
    }
  }
};

/**
 * @param { id: number, title: string } req
 * @param {*} res
 * @returns json with the updated post
 * @description Update an existing post by id
 * @route PUT /api/posts/:id
 */
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    if (!title || title.trim() === '') {
      const error: CustomError = new Error('Please provide a valid title');
      error.status = 400;
      return next(error);
    }

    const post = await findPostById(id);

    if (!post) {
      const error: CustomError = new Error(`A post with id ${id} not found`);
      error.status = 404;
      return next(error);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { title } },
      { new: true }, // ← returns the updated document
    );

    res.status(200).json({ msg: 'Post updated!', result: updatedPost });
  } catch (error) {
    next(error); // Properly forward unexpected errors
  }
};

/**
 * @param { id: number } req
 * @param {*} res
 * @returns json with a message confirming deletion
 * @description Delete a post by id
 * @route DELETE /api/posts/:id
 */
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const post: IPostItem | null = await findPostById(id);

    if (!post) {
      const error: CustomError = new Error(`A post with id ${id} not found`);
      error.status = 404;
      return next(error);
    }

    await Post.deleteOne({ _id: id });

    res.status(200).json({
      msg: `Post with id: ${id} is deleted!`,
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      const err: CustomError = new Error((error as Error).message);
      err.status = 500;
      return next(err);
    }
  }
};
