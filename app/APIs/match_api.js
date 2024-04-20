const express = require('express')
const router = express.Router()

const controller = require("../controllers/controller_match")

router.route("/:id").get(controller.get_one).put(controller.update).delete(controller.remove)
router.route("/").post(controller.add).get(controller.get_all).put(controller.get_all_put)

module.exports = router