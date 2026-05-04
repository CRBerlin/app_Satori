import UserWorkoutPlan from "../models/userWorkoutPlan.js";

const workoutPlanController = {

    // Crear plan
    create: async (req, res) => {
        try {
            const { userId, sessions } = req.body;

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "No autorizado" });
            }

            if (!userId || !sessions) {
                return res.status(400).json({ message: "Datos incompletos" });
            }

            const existingPlan = await UserWorkoutPlan.findOne({ userId });

            if (existingPlan) {
                return res.status(400).json({ message: "El usuario ya tiene plan" });
            }

            const newPlan = new UserWorkoutPlan({
                userId,
                sessions,
            });

            await newPlan.save();

            res.status(201).json({ message: "Plan creado correctamente" });

        } catch (error) {
            console.error("Error creando plan:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    },

    // Obtener plan del usuario logueado
    getMyPlan: async (req, res) => {
        try {
            const userId = req.user.id;

            const plan = await UserWorkoutPlan.findOne({ userId })
                .populate("sessions.exercises.exerciseId");

            if (!plan) {
                return res.status(404).json({ message: "No tiene plan asignado" });
            }

            res.status(200).json({ data: plan });

        } catch (error) {
            console.error("Error obteniendo plan:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    },

    // 🔥 Admin ver plan de cualquier usuario
    getByUserId: async (req, res) => {
        try {
            const { id } = req.params;

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "No autorizado" });
            }

            const plan = await UserWorkoutPlan.findOne({ userId: id })
                .populate("sessions.exercises.exerciseId");

            if (!plan) {
                return res.status(404).json({ message: "Plan no encontrado" });
            }

            res.status(200).json({ data: plan });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    },

    // Actualizar plan
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { sessions } = req.body;

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "No autorizado" });
            }

            const updatedPlan = await UserWorkoutPlan.findOneAndUpdate(
                { userId: id },
                { sessions },
                { new: true }
            );

            if (!updatedPlan) {
                return res.status(404).json({ message: "Plan no encontrado" });
            }

            res.status(200).json({ message: "Plan actualizado" });

        } catch (error) {
            console.error("Error actualizando plan:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    },

    // Eliminar plan
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "No autorizado" });
            }

            await UserWorkoutPlan.findOneAndDelete({ userId: id });

            res.status(200).json({ message: "Plan eliminado" });

        } catch (error) {
            console.error("Error eliminando plan:", error);
            res.status(500).json({ message: "Error del servidor" });
        }
    }

};

export default workoutPlanController;