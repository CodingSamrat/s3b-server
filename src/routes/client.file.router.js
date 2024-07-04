
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : file.router
// Description  : ...
// =================================================================================



import express from "express";
import { Copy, DeleteFile, GetBucketTree, IsFileExist, Move, ReadDir, UploadFile } from "../controllers/client.file.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { apiKeyAuth } from "../middlewares/api.auth.middleware.js";
const ClientFileRouter = express.Router();


// "/api/v1/file/upload
ClientFileRouter.post('/upload', apiKeyAuth, upload.single('file'), UploadFile)
ClientFileRouter.post('/delete', apiKeyAuth, DeleteFile)
ClientFileRouter.post('/is-exist', apiKeyAuth, IsFileExist)
ClientFileRouter.post('/read-dir', apiKeyAuth, ReadDir)
ClientFileRouter.post('/copy', apiKeyAuth, Copy)
ClientFileRouter.post('/move', apiKeyAuth, Move)
ClientFileRouter.get('/tree', apiKeyAuth, GetBucketTree) // [v1.1.0]




export default ClientFileRouter;
