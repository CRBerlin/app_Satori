import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //Verificar si el token está presente
        if (!authHeader) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        }

        //Formato del Bearer token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        //Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Guardar info del request
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error en autenticación:', error);
        return res.status(401).json({ message: 'Token de autenticación inválido o expirado' });
    }
};

export default authMiddleware;