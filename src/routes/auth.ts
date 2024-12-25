import * as express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.post("/signin", authController.signin);

export default router;