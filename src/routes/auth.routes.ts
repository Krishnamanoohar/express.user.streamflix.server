import { Router } from "express";
import { AuthControllers } from "../controller/auth.controller";

const router = Router();
const controller = new AuthControllers();

router.post("/register", controller.register);

export default router;
