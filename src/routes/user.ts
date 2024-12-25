import * as express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/", userController.signUp);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;