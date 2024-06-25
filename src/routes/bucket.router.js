
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : app.router
// Description  : Routers for Apps
// =================================================================================



import express from "express";
import { CreateBucket, DeleteBucket, GetAllBucket, GetBucketById } from "../controllers/bucket.controller.js";
const BucketRouter = express.Router();
import auth from '../middlewares/auth.middleware.js'
import admin from '../middlewares/admin.middleware.js'

// -----------------------------------------------------
// ACCESS : Public
BucketRouter.post('/create', auth, CreateBucket)
BucketRouter.get('/get/id/:id', auth, GetBucketById)
BucketRouter.get('/get', auth, GetAllBucket)
BucketRouter.delete('/delete/:id', auth, admin, DeleteBucket)


export default BucketRouter;
