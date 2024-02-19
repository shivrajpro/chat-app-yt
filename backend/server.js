import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config(); //to capture the PORT number fron .env file

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
/* 
app.get("/", (req, res) => {
  res.send("hello from server. nodemon installed. port changed");
});

 */
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
});
/* 
app.get("/api/auth/signup", (req,res)=>{
    console.log("sign up route");
    // to avoid this redundancy create separate files for routes
})
app.get("/api/auth/login", (req,res)=>{
    console.log("login route");
})
app.get("/api/auth/logout", (req,res)=>{
    console.log("logout route");
})
*/
