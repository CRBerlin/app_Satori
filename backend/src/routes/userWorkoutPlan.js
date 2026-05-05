import { Router } from "express";
import workoutPlanController from "../controllers/userWorkoutPlan.js";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const userWorkoutPlanRouter = Router();

// Admin crea plan
userWorkoutPlanRouter.post("/", authMiddleware, roleMiddleware("admin"), workoutPlanController.create);

// Admin obtiene todos los planes
userWorkoutPlanRouter.get("/", authMiddleware, roleMiddleware("admin"), workoutPlanController.getAll);

// Usuario obtiene su plan
userWorkoutPlanRouter.get("/me", authMiddleware, roleMiddleware("user"), workoutPlanController.getMyPlan);

// Admin consulta plan de un usuario
userWorkoutPlanRouter.get("/:id", authMiddleware, roleMiddleware("admin"), workoutPlanController.getByUserId);

// Admin actualiza plan
userWorkoutPlanRouter.put("/:id", authMiddleware, roleMiddleware("admin"), workoutPlanController.update);

// Admin elimina plan
userWorkoutPlanRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), workoutPlanController.delete);

export default userWorkoutPlanRouter;