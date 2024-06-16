import Users from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';


export default class UsersService {
    getUsers = async () => {
        // return "Getting Todos from service";
        return await Users.find({}); // find({}) mean find all objects
    };

    registerUser = async (newUser) => {
        let user;
        try {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            user = new Users(newUser);
        } catch (e) {
            throw new Error("Invalid User");
        }

        // console.log(await bcrypt.compare("securepassword", newUser.password));
        return await user.save();
    };

    loginUser = async (email, password) => {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials for for Email");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials for Password");
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return { token }; // return { token: token };
    };

}