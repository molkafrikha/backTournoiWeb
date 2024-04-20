const express = require('express')
const router = express.Router()

const controller = require("../controllers/controller_team")

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Destination folder
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = `${Date.now()}${ext}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single("image")

const processUpload = (req, res, next) => {
    upload(req, res, (err) => {
        try {
            //console.log(req)
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Multer error: ' + err.message });
            } else if (err) {
                return res.status(500).json({ error: 'Unknown error: ' + err.message });
            }
            req.uploadedFilename = req.file.filename

            next()
        } catch (err) {
            console.log(err)
            res.status(400).send({ error: err })
        }

    });
};

router.route("/:id").get(controller.get_one).put(controller.update).delete(controller.remove)
router.route("/").post(
    processUpload,
    async (req, res) => {
        try {
            console.log("AAAAAAAAAAA")
            const team_service = require("../services/service_team")
            const { name, country, birthday, owner } = req.body
            const image_path = req.uploadedFilename
            await team_service.create({ name, image_path, country, birthday, owner })
            res.status(201).send({ "status": "created" })
        } catch (err) {
            console.log(err)
            res.status(400).send({ "error": err })
        }
    }).get(controller.get_all)

module.exports = router