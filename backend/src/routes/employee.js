import { Router } from "express";
import employeeController from "../controllers/employee.js";
import authMiddleware from "../middleware/auth.js";

const employeeRouter = Router();

employeeRouter.post("/", authMiddleware, employeeController.create);
employeeRouter.get("/", authMiddleware, employeeController.readAll);
employeeRouter.get("/:employeeCode", authMiddleware, employeeController.read);
employeeRouter.put("/:employeeCode", authMiddleware, employeeController.update);
employeeRouter.delete("/:employeeCode", authMiddleware, employeeController.delete);

export default employeeRouter;  