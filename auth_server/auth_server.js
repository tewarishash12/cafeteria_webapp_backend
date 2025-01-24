const express = require("express");
const app = express();
const {} = require("../database/database");
const morgan = require('morgan');
const authRoutes = require("./auth_routes/authRoutes")

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use(express.json());
app.use(morgan("dev"));

app.use('/auth', authRoutes);


//setting up the server port
app.listen(process.env.AUTH_PORT, ()=>{
    console.log(`Auth Server is connected on http://localhost:${process.env.AUTH_PORT}`)
})