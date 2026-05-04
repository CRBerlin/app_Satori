import Users from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Buscar el usuario por email
            const user = await Users.findOne({ email }).select('+password');
            if (!user) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Generar el token
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' });

            // Enviar el token al cliente sin incluir la contraseña
            res.json({
                message: 'Login exitoso',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);            
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default authController;