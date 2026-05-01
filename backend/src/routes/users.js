import { Router } from "express";
import userController from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const usersRouter = Router();

// Registro (sin token)
usersRouter.post("/", userController.create);

// Protegidas
usersRouter.get("/", authMiddleware, userController.readAll);
usersRouter.get("/:id", authMiddleware, userController.read);
usersRouter.put("/:id", authMiddleware, userController.update);
usersRouter.delete("/:id", authMiddleware, userController.delete);

export default usersRouter;