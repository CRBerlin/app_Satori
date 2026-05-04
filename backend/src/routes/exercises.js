import { Router } from "express";
import exercisesController from "../controllers/exercises.js";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const exercisesRouter = Router();

//CRUD admin de los ejercicios
exercisesRouter.post("/", authMiddleware, roleMiddleware("admin"), exercisesController.create);
exercisesRouter.get("/", authMiddleware, roleMiddleware("admin"), exercisesController.readAll);
exercisesRouter.get("/:id", authMiddleware, roleMiddleware("admin"), exercisesController.read);
exercisesRouter.put("/:id", authMiddleware, roleMiddleware("admin"), exercisesController.update);
exercisesRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), exercisesController.delete);

export default exercisesRouter;