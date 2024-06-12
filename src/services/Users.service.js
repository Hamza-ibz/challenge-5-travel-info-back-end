import Users from "../models/Users.model.js";

export default class UsersService {
    getUsers = async () => {
        // return "Getting Todos from service";
        return await Users.find({}); // find({}) mean find all objects
    };
}