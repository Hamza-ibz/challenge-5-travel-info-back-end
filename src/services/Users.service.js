import Users from "../models/Users.model.js";

export default class UsersService {
    getUsers = async () => {
        // return "Getting Todos from service";
        return await Users.find({}); // find({}) mean find all objects
    };

    registerUser = async (newUser) => {
        let user;
        try {
            user = new Users(newUser);
        } catch (e) {
            throw new Error("Invalid User");
        }
        return await user.save();
    };

}