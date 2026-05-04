import bcrypt from 'bcrypt';
import usersModel from '../models/users.js';

const userController = {
    create: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos son requeridos' });
            }
            const existingUser = await usersModel.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está en uso' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new usersModel({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role
            });

            await newUser.save();
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    readAll: async (req, res) => {
        try {
            let users;
            //Admin puede ver todos los usuarios, el resto solo su propio perfil
            if (req.user.role === 'admin') {
                users = await usersModel.find().select('-password');
            } else {
                users = await usersModel.find({ _id: req.user.id }).select('-password');
            }
            res.status(200).json({ data: users });
        } catch (error) {
            console.error('Error reading users:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    read: async (req, res) => {
        try {
            const userId = req.params.id;
            //Comprobamos el rol
            if (req.user.role !== 'admin' && req.user.id !== userId) {
                return res.status(403).json({ message: 'No tienes permisos para ver este usuario' });
            }
            const userFound = await usersModel.findById(userId).select('-password');
            if (userFound) {
                res.status(200).json({ data: userFound });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error reading user:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    update: async (req, res) => {
    try {
        const userId = req.params.id;
        let { name, email, password, role } = req.body;

        // Validación de permisos
        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({
                message: 'No tienes permisos para actualizar este usuario'
            });
        }

        // Solo admin puede cambiar rol
        if (req.user.role !== 'admin') {
            role = undefined;
        }

        // Construir objeto dinámico
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email.toLowerCase();
        if (role) updateData.role = role;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await usersModel
            .findByIdAndUpdate(userId, updateData, { new: true })
            .select('-password');

        if (updatedUser) {
            res.status(200).json({
                message: 'Usuario actualizado correctamente.',
                data: updatedUser
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
},
    delete: async (req, res) => {
        try {
            const userId = req.params.id;
            const usersDeleted = await usersModel.findByIdAndDelete(userId);
            if (usersDeleted) {
                res.status(200).json({ message: 'Usuario eliminado correctamente.' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
};

export default userController;