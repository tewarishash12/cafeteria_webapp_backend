const express = require("express");
const app = express();
const {} = require("./database");
// const cartRoutes = require("./routes/cartRoutes")
const userRoutes = require("./routes/userRoutes")

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})

app.use(express.json());

// app.use('/cart', cartRoutes);
app.use('/users', userRoutes);
// app.use('/counter');
// app.use('/dish');


//setting up the server port
app.listen(process.env.MAIN_PORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAIN_PORT}`)
})