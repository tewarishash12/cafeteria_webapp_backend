const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
    dish_name:{type:String, required:true},
    description:{type:String},
    image: {type:String},
    price: {type:Number, required:true, min:1},
    availability: {String:Boolean, default:true, required:true},
    counter_id: {type:mongoose.Schema.Types.ObjectId, required:true}
})

module.exports = mongoose.model("Dish", DishSchema)