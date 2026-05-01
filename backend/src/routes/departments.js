import { Router } from "express";
import departmentController from "../controllers/departments.js";
import authMiddleware from "../middleware/auth.js";

const departmentsRouter = Router();

departmentsRouter.post("/", authMiddleware, departmentController.create);
departmentsRouter.get("/:departmentCode/employees", authMiddleware, departmentController.readDepartmentwithEmployees);
departmentsRouter.get("/", authMiddleware, departmentController.readAll);
departmentsRouter.get("/:departmentCode", authMiddleware, departmentController.read);
departmentsRouter.put("/:departmentCode", authMiddleware, departmentController.update);
departmentsRouter.delete("/:departmentCode", authMiddleware, departmentController.delete);

// departamento + empleados

// 🔥 todos los departamentos con empleados
// departmentsRouter.get(
//     "/with-employees",
//     authMiddleware,
//     departmentController.getDepartmentsWithEmployees
// );

export default departmentsRouter;