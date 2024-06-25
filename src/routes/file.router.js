
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : file.router
// Description  : ...
// =================================================================================



import express from "express";
import { deleteFile, isFileExist, uploadFile } from "../controllers/file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { apiKeyAuth } from "../middlewares/api.auth.middleware.js";
const FileRouter = express.Router();


// "/api/v1/file/upload
FileRouter.post('/client/upload', apiKeyAuth, upload.single('file'), uploadFile)
FileRouter.post('/client/delete', apiKeyAuth, deleteFile)
FileRouter.post('/client/is-exist', apiKeyAuth, isFileExist)




export default FileRouter;
