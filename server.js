import express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFound.js";
import posts from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

// Connect mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("mongodb connected"["bgGreen"]))
  .catch((err) => console.error(`mongodb error: ${err}`["bgRed"]));

//! Highlights: Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

//! Routes
app.use("/api/posts", posts);

// Route not found handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}"`["bgBlue"]);
});
