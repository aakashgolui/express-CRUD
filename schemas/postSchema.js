import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("post", postSchema);
