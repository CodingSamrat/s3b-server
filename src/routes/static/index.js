
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : static.router
// Description  : ...
// =================================================================================



import express from "express";

import auth from '../../middlewares/auth.middleware.js'
import HomeRouter from "./home.router.js";
import DashboardRouter from "./dashboard.router.js";

const StaticRouter = express.Router();


// ACCESS : Public
StaticRouter.get('/', HomeRouter)

// ACCESS : Private [auth]
StaticRouter.get('/dashboard', auth, DashboardRouter)


export default StaticRouter;