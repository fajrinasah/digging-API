import express from "express";
import { categoriesController } from "../controllers/index.js";

export const routers = express.Router();

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET ALL CATEGORIES
routers.get("/categories", categoriesController.getAllCategories);
