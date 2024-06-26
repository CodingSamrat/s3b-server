
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : app.router
// Description  : Routers for Apps
// =================================================================================



import express from "express";
import { LoginUser, CreateUser, UpdatePassword, GetCurrentUser, GetAllUser, DeleteUser } from "../controllers/auth.controller.js";
import auth from '../middlewares/auth.middleware.js'

const AuthRouter = express.Router();


// -----------------------------------------------------
// ACCESS : Public
AuthRouter.post('/create', auth, CreateUser)
AuthRouter.delete('/delete/:id', auth, DeleteUser)
AuthRouter.post('/login', LoginUser)

// ACCESS : Protected [auth]
AuthRouter.get('/current', auth, GetCurrentUser)
AuthRouter.get('/get', auth, GetAllUser)
AuthRouter.put('/update-password', auth, UpdatePassword)


export default AuthRouter;