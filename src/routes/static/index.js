
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : static.router
// Description  : ...
// =================================================================================



import express from "express";

import HomeRouter from "./home.router.js";
import DashboardRouter from "./dashboard.router.js";
import staticAuth from "../../middlewares/static.auth.middleware.js";

const StaticRouter = express.Router();


// ACCESS : Public
StaticRouter.get('/', HomeRouter)

// ACCESS : Private [auth]
StaticRouter.get('/dashboard', staticAuth, DashboardRouter)


export default StaticRouter;