import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: `No token provided` });
    }

    // uses process.env.SECRET to de code to get payload and header (search jwi.io in google)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: `Unauthorised` });
        }

        req.userId = decoded.id;
        next(); // calls next function (which is userBoard in routes -> user.routes) 
    });
};
