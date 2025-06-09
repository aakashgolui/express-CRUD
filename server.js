import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import posts from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

//! Highlights: Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! Routes
app.use("/api/posts", posts);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}"`);
});
