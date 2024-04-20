const express = require('express')
const router = express.Router()

const controller = require("../controllers/controller_participant")

router.route('/score').put(controller.find_update_score)
router.route('/reset').post(controller.reset_all)
router.route('/randomize').post(controller.randomize)

router.route('/find_all').post(controller.get_all_put)
router.route('/find').post(controller.find_one)
router.route('/invite').post(async(req, res, next) => {console.log('ss'); next()}, controller.invite_team)

router.route("/:id").get(controller.get_one).put(controller.update).delete(controller.remove)
router.route("/").post(controller.add).get(controller.get_all).put(controller.find_update)

module.exports = router