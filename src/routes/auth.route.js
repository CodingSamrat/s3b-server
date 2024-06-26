
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : app.router
// Description  : Routers for Apps
// =================================================================================



import express from "express";
import { LoginUser, CreateUser, UpdatePassword, GetCurrentUser } from "../controllers/auth.controller.js";
import auth from '../middlewares/auth.middleware.js'
import admin from '../middlewares/admin.middleware.js'

const AuthRouter = express.Router();


// -----------------------------------------------------
// ACCESS : Public
AuthRouter.post('/create', auth, admin, CreateUser)
AuthRouter.post('/login', LoginUser)

// ACCESS : Protected [auth]
AuthRouter.get('/current', auth, GetCurrentUser)
AuthRouter.put('/update-password', auth, UpdatePassword)


export default AuthRouter;