import { Router } from "express";

import * as categoriesControllers from "./index.js";

const router = Router();

/*------------------------------------------------------------
GET
- getAllCategories
-------------------------------------------------------------*/
router.get("/", categoriesControllers.getAllCategories);

export default router;
