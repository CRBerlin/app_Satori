import { Router } from "express";
import userController from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const usersRouter = Router();

// Registro (sin token)
usersRouter.post("/", userController.create);

// Protegidas
usersRouter.get("/", authMiddleware, userController.readAll);
usersRouter.get("/:id", authMiddleware, roleMiddleware("admin", "user"), userController.read);
usersRouter.put("/:id", authMiddleware, roleMiddleware("admin", "user"), userController.update);
usersRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), userController.delete);

export default usersRouter;