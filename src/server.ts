import colors from 'colors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/error.ts';
import logger from './middleware/logger.ts';
import notFoundHandler from './middleware/notFound.ts';
import { AuthRoutes, PostRoutes } from './routes/index.ts';

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL || '';

const app = express();

// Connect mongo
mongoose
  .connect(DB_URL)
  .then(() => console.log(colors.bgGreen('mongodb connected')))
  .catch((err: any) => console.error(`mongodb error: ${err}`));

//! Highlights: Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

//! Routes
app.use('/api/posts', PostRoutes);
app.use('/api/auth', AuthRoutes);

// Route not found handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(colors.bgCyan(`Server is running on PORT ${PORT}"`));
});
