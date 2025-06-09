import express from "express";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}"`);
});