const express = require("express");
const app = express();
const {} = require("./database");
const morgan = require('morgan');
const cors = require("cors");
const cartRoutes = require("./main_routes/cartRoutes")
const dishRoutes = require("./main_routes/dishRoutes")
const userRoutes = require("./main_routes/userRoutes")
const counterRoutes = require("./main_routes/counterRoutes")

app.use(cors({
    origin:true,
    credentials:true
}))
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use('/cart', cartRoutes);
app.use('/users', userRoutes);
app.use('/counter', counterRoutes);
app.use('/dish', dishRoutes);


//setting up the server port
app.listen(process.env.MAIN_PORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAIN_PORT}`)
})