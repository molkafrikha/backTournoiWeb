const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name : String,
    image_path : String,
    country : String,
    birthday : Date,
    owner : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})

const model = mongoose.model("team", schema);
module.exports = model;
