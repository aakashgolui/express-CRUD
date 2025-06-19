import { Post } from '../models/postModel.ts';
import { IPostItem } from '../types/index.ts';

export const findAllPosts = async (limit: number = NaN) => {
  const query = Post.find({});

  if (!isNaN(limit) && limit > 0) {
    query.limit(limit);
  }

  return query;
};

export const findPostById = async (id: string) => {
  const query = await Post.findById<IPostItem>(id);

  return query;
};
