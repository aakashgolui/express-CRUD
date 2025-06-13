import { Post } from "../schemas/postSchema.js";

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

/**
 *
 * @param { limit: number } req
 * @param {*} res
 * @returns json with all posts or limited number of posts
 * @description Get all posts or a limited number of posts
 * @route GET /api/posts
 */
export const getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10);
    const query = Post.find({});

    if (!isNaN(limit) && limit > 0) {
      query.limit(limit);
    }

    const posts = await query;
    return res.status(200).json(posts);
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    return next(err);
  }
};

/**
 * @param { id: number } req
 * @param {*} res
 * @returns json with a single post
 * @description Get a single post by id
 * @route GET /api/posts/:id
 */
export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      const error = new Error("No post found with this ID");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json(post[0]);
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    return next(err);
  }
};

/**
 * @param { title: string } req
 * @param {*} res
 * @returns json with the newly created post
 * @description Create a new post
 * @route POST /api/posts
 */
export const createPost = async (req, res, next) => {
  const title = req.body.title;

  if (!title || title === "") {
    const error = new Error("Please provide a valid title");
    error.status = 400;
    return next(error);
  }

  try {
    await Post.create({
      title,
    });
    res.status(201).json({
      msg: "New post created!",
      posts: posts,
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 500;
    return next(err);
  }
};

/**
 * @param { id: number, title: string } req
 * @param {*} res
 * @returns json with the updated post
 * @description Update an existing post by id
 * @route PUT /api/posts/:id
 */
export const updatePost = (req, res, next) => {
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
};

/**
 * @param { id: number } req
 * @param {*} res
 * @returns json with a message confirming deletion
 * @description Delete a post by id
 * @route DELETE /api/posts/:id
 */
export const deletePost = (req, res, next) => {
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
};
