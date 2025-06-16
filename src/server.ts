import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/error.ts';
import logger from './middleware/logger.ts';
import notFoundHandler from './middleware/notFound.ts';
import posts from './routes/posts.ts';

const PORT = process.env.PORT || 8080;

const app = express();

// Connect mongo
mongoose
  .connect('mongodb://127.0.0.1:27017/blog')
  .then(() => console.log(colors.bgGreen('mongodb connected')))
  .catch((err: any) => console.error(`mongodb error: ${err}`));

//! Highlights: Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

//! Routes
app.use('/api/posts', posts);

// Route not found handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(colors.bgCyan(`Server is running on PORT ${PORT}"`));
});
