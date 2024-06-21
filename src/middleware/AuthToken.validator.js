import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//     let token = req.headers["x-access-token"];

//     if (!token) {
//         return res.status(403).send({ message: `No token provided` });
//     }

//     // uses process.env.SECRET to de code to get payload and header (search jwi.io in google)
//     jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).send({ message: `Unauthorised` });
//         }

//         req.userId = decoded.id;
//         next(); // calls next function (which is userBoard in routes -> user.routes) 
//     });
// };


const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    // Split the header to get the token
    const token = authHeader.split(' ')[1]; // This removes the 'Bearer ' part
    if (!token) {
        return res.status(401).json({ message: 'Access denied, invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded);
        req.userId = decoded.userId;
        // req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
