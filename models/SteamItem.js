const {Schema, model} = require("mongoose");

const SteamItem = new Schema({
    itemName: {type:String, unique: false, required: false},
    marketUrl: {type:String, unique: false, required: true},
    customerPrice: {type:String, unique: false, required: true},
    marketHighestPrice: {type:String, unique: false, required: true},
    tg_id: {type:String, unique: false, required: true},
})

// const User = new Schema({
//     userName: {type:String, unique: false, required: true},
//     tg_id: {type:String, unique: true, required: true},
//     items: [{SteamItem}],
// })

module.exports = model("SteamItem", SteamItem);