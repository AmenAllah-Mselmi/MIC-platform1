import express from "express";
import mongoose from "mongoose";
import Instructor from "./routes/instructor_route.js";
import Member from "./routes/member_route.js";
import Super_admin from "./routes/super_admin_route.js";
import assignment from "./routes/assignment_route.js"; // Fixed typo
import session from "./routes/session_route.js";
import dotenv from "dotenv";
import response from './routes/response_route.js'
import attachement from './routes/attachement_route.js';
import user from './routes/user_route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const url = process.env.MONGODB_URL;
mongoose
  .connect(url) 
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message); 
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/instructor", Instructor);
app.use("/api/member", Member);
app.use("/api/super_admin", Super_admin);
app.use("/api/session", session);
app.use("/api/assignment", assignment); 
app.use('/api/attachement', attachement);
app.use('/api/response', response);
app.use('/api/user',user)
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
