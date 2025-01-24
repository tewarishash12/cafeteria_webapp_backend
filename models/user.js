const mongoose = require("mongoose");

const CartItem = new mongoose.Schema({
    item: [{type: mongoose.Schema.Types.ObjectId}],
    quantity: {type:Number, min:1 }
})

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    phoneNo: {type:String, required:true},
    role: {type:String, enum:["customer", "merchant", "admin"],required:true, default:"customer"},
    cart: {type:[CartItem]},
    // password: {type:String, required:true},
})

module.exports = mongoose.model("User", UserSchema)