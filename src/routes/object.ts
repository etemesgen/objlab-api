import * as express from "express";
import * as objectController from "../controllers/objectController";

const router = express.Router();

router.post("/", objectController.createObject);
router.get("/", objectController.getAllObjects);
router.get("/:id", objectController.getObject);
router.put("/:id", objectController.updateObject);
router.delete("/:id", objectController.deleteObject);

export default router;