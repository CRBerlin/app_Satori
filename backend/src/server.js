import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dns from "node:dns";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import departmentsRouter from "./routes/departments.js";
import employeeRouter from "./routes/employee.js";
// Importaciones para acceder a las rutas del frontend - configurar el acceso al frontend.
import { fileURLToPath } from "node:url";
import path from "node:path";


//Se fuerza DNS de google para evitar error ECONNREFUSED en localhost. Se usa solo para localhost, en producción no es necesario.
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// configuraciones para acceder al front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/departments", departmentsRouter);
app.use("/employees", employeeRouter);

// Cambia a true si estás trabajando en local y quieres servir el frontend desde el mismo servidor
const proyectoLocal = false; 

// vamos a hacer la petición para que se muestre nuestro front
// Servir archivos estáticos desde la carpeta "public"
if (proyectoLocal) {
  app.use(express.static(path.join(__dirname, "public")));

  // Ruta principal para servir index.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  //test route
  app.get("/", (req, res) => {
    res.status(200).send("API is running");
  });
};


// Connect to the database and start the server
const PORT = process.env.PORT || 3000;
await connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });