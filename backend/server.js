import express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
//this two fro the middelware
import passport from "passport";
import session from "express-session";

import path from "path";
import "./passport/github.auth.js"
import userRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import authRoutes from "./routes/auth.route.js"
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config(); // this is allow us to get this env variables
const app = express();
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
      res.send("Server is ready")
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);

app.listen(5000,()=>{
      console.log("Server start on http://localhost:5000")
      connectMongoDB();
})