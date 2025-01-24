const express = require("express");
const app = express();
const {} = require("../database");
const morgan = require('morgan')
// const cartRoutes = require("./routes/cartRoutes")
const userRoutes = require("../routes/userRoutes")
const counterRoutes = require("../routes/counterRoutes")
const authRoutes = require("../routes/authRoutes")

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use(express.json());
app.use(morgan("dev"));

// app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/counter', counterRoutes);
// app.use('/dish');


//setting up the server port
app.listen(process.env.MAIN_PORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAIN_PORT}`)
})