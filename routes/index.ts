import { Router } from "express";
import buyRouter from "./buyRoutes.js";
import cardRouter from "./cardRoutes.js";

const router = Router();
router.use(buyRouter)
router.use(cardRouter)

export default router;
