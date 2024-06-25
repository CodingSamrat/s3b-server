
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : static.dashboard.router
// Description  : ...
// =================================================================================



import express from "express";
import { dashboardPage } from "../../controllers/static/dashboard.controller.js";


const DashboardRouter = express.Router();


// ACCESS : Private [auth]
DashboardRouter.get('/', dashboardPage)


export default DashboardRouter;