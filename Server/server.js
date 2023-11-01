import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({limit: '10mb',extended:true}));
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });



app.use(express.static("public"))


app.use('/admin', adminRoutes);
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started with port number: " + process.env.PORT);
})
  .on("error", (error) => {
    console.error("Server failed to start:", error);
  });
