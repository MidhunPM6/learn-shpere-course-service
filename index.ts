import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = 6001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});