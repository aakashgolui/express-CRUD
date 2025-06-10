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
export const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
};

/**
 * @param { id: number } req
 * @param {*} res
 * @returns json with a single post
 * @description Get a single post by id
 * @route GET /api/posts/:id
 */
export const getPost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    const error = new Error("No post found with this id");
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

/**
 * @param { title: string } req
 * @param {*} res
 * @returns json with the newly created post
 * @description Create a new post
 * @route POST /api/posts
 */
export const createPost = (req, res, next) => {
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
