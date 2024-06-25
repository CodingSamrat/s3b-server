
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : app.router
// Description  : Routers for Apps
// =================================================================================



import express from "express";
import { LoginUser, CreateUser, UpdatePassword } from "../controllers/auth.controller.js";
import auth from '../middlewares/auth.middleware.js'
import admin from '../middlewares/admin.middleware.js'

const AuthRouter = express.Router();


// -----------------------------------------------------
// ACCESS : Public
AuthRouter.post('/create', auth, admin, CreateUser)
AuthRouter.post('/login', LoginUser)

// ACCESS : Protected [auth]
AuthRouter.put('/update-password', auth, UpdatePassword)


export default AuthRouter;