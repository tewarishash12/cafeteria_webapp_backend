const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    merchant_id: [{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}],
    description: {type:String},
    image: {type: String},
    hours: {type: String},
    isActive: {type: Boolean},
    shop_name: {type:String, required:true}
})

module.exports = mongoose.model("Counter", CounterSchema)