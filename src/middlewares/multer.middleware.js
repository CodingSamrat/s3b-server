import multer from "multer";
import { MAX_FILE_SIZE } from "../../s3b.config.js";

let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, "./public/temp")
    },

    filename: function (req, file, cb) {

        cb(null, file.originalname)
    },
})

// storage = multer.memoryStorage()


export const upload = multer({
    storage,
})