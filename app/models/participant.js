const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    tournament : {
        type : mongoose.Types.ObjectId,
        ref : 'tournament'
    },
    team : {
        type : mongoose.Types.ObjectId,
        ref : 'team'
    },
    group : String,
    bracket : String,
    wins : {
        type : Number,
        default : 0
    },
    losses : {
        type : Number,
        default : 0
    },
    draws : {
        type : Number,
        default : 0
    }
})

const model = mongoose.model("participant", schema);
module.exports = model;
