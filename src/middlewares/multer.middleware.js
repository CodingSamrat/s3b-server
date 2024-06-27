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
    // limits: {
    //     fieldNameSize: 255, // Adjust this value based on your needs
    //     fieldSize: 1024 * 1024 * 20, // 2 MB (adjust as necessary)
    //     fileSize: 1024 * 1024 * 50 // 10 MB (adjust as necessary)
    // }
})