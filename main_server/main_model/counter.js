const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    merchant_id: {type:[mongoose.Schema.Types.ObjectId], ref:"User", required:true},
    shop_name: {type:String, required:true}
})

module.exports = mongoose.model("Counter", CounterSchema)