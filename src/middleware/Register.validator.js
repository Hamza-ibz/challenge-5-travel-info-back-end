import * as expressValidator from "express-validator";
import Users from "../models/Users.model.js";
// Middleware sits between the incoming request from a client and the final response sent back to the client.
// It can be thought of as a series of steps or layers that the request and response pass through. 
// Logging: Middleware can log details about each request, such as the URL, method, headers, and body.
// Authentication and Authorization: Middleware can check if a user is authenticated or has the necessary permissions to access a resource.
// Error Handling: Middleware can catch and handle errors that occur during request processing.
// Request Parsing: Middleware can parse request bodies(e.g., JSON, URL - encoded data) and make them available on the req object.
export default class registerValidator {
    static validate = () => {
        return [
            expressValidator.body("_id").optional().isMongoId(),
            expressValidator
                .body("email").exists()
                .normalizeEmail()
                .escape()
                .isEmail()
                .notEmpty()
                .withMessage("A valid email is required"),
            expressValidator
                .body("password").exists()
                .escape()
                .notEmpty()
                .isLength({ min: 8 })
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                .withMessage("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."),
            expressValidator
                .body("favouriteLocations")
                .optional()
                .isArray()
                .withMessage("Favourite locations must be an array"),
            registerValidator.handleValidationErrors,
        ];
    };
    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
    static checkDuplicateEmail = () => {
        return async (req, res, next) => {
            try {
                const user = await Users.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ errors: [{ msg: 'Email already in use' }] });
                }
                next();
            } catch (err) {
                return res.status(500).json({ errors: [{ msg: 'Server error' }] });
            }
        };
    };
}