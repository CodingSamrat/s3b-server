
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : static.home.router
// Description  : ...
// =================================================================================



import express from "express";
import { homePage } from "../../controllers/static/home.controller.js";
const HomeRouter = express.Router();


// ACCESS : Public
HomeRouter.get('/', homePage)


export default HomeRouter;