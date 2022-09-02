import { Router } from "express";
import buyRouter from "./buyRoutes";
import cardRouter from "./cardRoutes";
import rechargeRouter from "./rechargeRoutes";

const router = Router();
router.use(buyRouter)
router.use(cardRouter)
router.use(rechargeRouter)

export default router;
