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

/*schema.pre('save', (req, res, next) => {
    if(this.password.toString().length > 0){
        this.is_private = true
    }
    next()
})*/

const model = mongoose.model("tournament", schema);
module.exports = model;
