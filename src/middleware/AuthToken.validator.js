import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1]; // This removes the 'Bearer ' part
    if (!token) {
        return res.status(401).json({ message: 'Access denied, invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        console.log("Decoded userId: ", decoded.userId);
        next();
    } catch (e) {
        console.log("Invalid token");
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;


