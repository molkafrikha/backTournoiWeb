const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    tournament : {
        type : mongoose.Types.ObjectId,
        ref : 'tournament'
    },
    team1 : {
        type : mongoose.Types.ObjectId,
        ref : 'team'
    },
    team2 : {
        type : mongoose.Types.ObjectId,
        ref : 'team'
    },
    score1 : {
        type : Number,
        default : 0
    },
    score2: {
        type : Number,
        default : 0
    },
    foul1: {
        type : Number,
        default : 0
    },
    foul2: {
        type : Number,
        default : 0
    },
    penalty1: {
        type : Number,
        default : 0
    },
    penalty2: {
        type : Number,
        default : 0
    },
    passed : {
        type : Boolean,
        default : false
    },
    group : Boolean,
    placement : String
})

const model = mongoose.model("match", schema);
module.exports = model;
