import Users from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';


export default class UsersService {
    getUsers = async () => {

        return await Users.find({}); // find({}) mean find all objects
    };

    updatePassword = async (userId, currentPassword, newPassword) => {
        const user = await Users.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
    };

    registerUser = async (newUser) => {
        let user;
        try {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            user = new Users(newUser);
        } catch (e) {
            throw new Error("Invalid User");
        }

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
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '365d' });

        return { token }; // return { token: token };
    };

}