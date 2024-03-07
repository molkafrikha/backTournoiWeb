const express = require('express')
const router = express.Router()

const controller = require("../controllers/controller_team")

router.route("/:id").get(controller.get_one).put(controller.update).delete(controller.remove)
router.route("/").post(controller.add).get(controller.get_all)

module.exports = router