const service = require("../services/service_match")

const default_controller_class = require("./default_controller")
const default_controller = new default_controller_class({ service })

const create_many = (req, res) => {
    try{
        const model = require('../models/match')
        res.status(200)
    } catch(err){
        console.log(err)
        res.status(400)
    }
}

module.exports = {
    ...default_controller.methods
}