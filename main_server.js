const express = require("express");
const app = express();
const {} = require("./database");

app.get("/", (req,res)=>{
    res.json({message:"hello user"});
})


//setting up the server port
app.listen(process.env.MAIN_PORT, ()=>{
    console.log(`Main Server is connected on http://localhost:${process.env.MAIN_PORT}`)
})