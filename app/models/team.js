const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name : String,
    image_path : String,
    country : String,
    birthday : Date
})

const model = mongoose.model("team", schema);
module.exports = model;
