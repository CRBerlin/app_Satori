import excercisesModel from '../models/exercises.js';

const excercisesController = {
    create: async (req, res) => {
        try {
            // Solo el admin puede crear ejercicios, el resto no puede crear ninguno.
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para crear ejercicios' });
            }
            const { name, description, videoUrl, muscleGroup, difficulty } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'El nombre del ejercicio es requerido' });
            }
            const newExercise = new excercisesModel({
                name,
                description,
                videoUrl,
                muscleGroup,
                difficulty
            });
            await newExercise.save();
            res.status(201).json({ message: 'Ejercicio creado exitosamente' });
        } catch (error) {
            console.error('Error creating exercise:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    readAll: async (req, res) => {
        try {
            let exercises;
            // Admin puede ver todos los ejercicios, el resto no puede ver ninguno.
            if (req.user.role === 'admin') {
                exercises = await excercisesModel.find();
            } else {
                return res.status(403).json({ message: 'No tienes permisos para ver los ejercicios' });
            }
            res.status(200).json({ data: exercises });
        } catch (error) {
            console.error('Error reading exercises:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    read: async (req, res) => {
        try {
            const exerciseId = req.params.id;
            // Comprobamos el rol
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para ver este ejercicio' });
            }
            const exerciseFound = await excercisesModel.findById(exerciseId);
            if (exerciseFound) {
                res.status(200).json({ data: exerciseFound });
            } else {
                res.status(404).json({ message: 'Ejercicio no encontrado' });
            }
        } catch (error) {
            console.error('Error reading exercise:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    update: async (req, res) => {
        try {
            const exerciseId = req.params.id;
            const { name, description, videoUrl, muscleGroup, difficulty } = req.body;
            // Validación de permisos
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para actualizar este ejercicio' });
            }
            const exerciseToUpdate = await excercisesModel.findById(exerciseId);
            if (!exerciseToUpdate) {
                return res.status(404).json({ message: 'Ejercicio no encontrado' });
            }
            exerciseToUpdate.name = name || exerciseToUpdate.name;
            exerciseToUpdate.description = description || exerciseToUpdate.description;
            exerciseToUpdate.videoUrl = videoUrl || exerciseToUpdate.videoUrl;
            exerciseToUpdate.muscleGroup = muscleGroup || exerciseToUpdate.muscleGroup;
            exerciseToUpdate.difficulty = difficulty || exerciseToUpdate.difficulty;
            await exerciseToUpdate.save();
            res.status(200).json({ message: 'Ejercicio actualizado exitosamente' });
        } catch (error) {
            console.error('Error updating exercise:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    delete: async (req, res) => {
        try {
            const exerciseId = req.params.id;
            // Validación de permisos
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para eliminar este ejercicio' });
            }
            const exerciseToDelete = await excercisesModel.findById(exerciseId);
            if (!exerciseToDelete) {
                return res.status(404).json({ message: 'Ejercicio no encontrado' });
            }
            await excercisesModel.findByIdAndDelete(exerciseId);
            res.status(200).json({ message: 'Ejercicio eliminado exitosamente' });
        } catch (error) {
            console.error('Error deleting exercise:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
};

export default excercisesController;
