const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    is_private: Boolean,
    password: String,
    max_teams: Number,
    playing_field: String,
    start_date: String,
    end_date: String
})

const model = mongoose.model("tournament", schema);
module.exports = model;
