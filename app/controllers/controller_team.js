const service = require("../services/service_team")

const default_controller_class = require("./default_controller")
const default_controller = new default_controller_class({ service })

module.exports = {
    ...default_controller.methods
}