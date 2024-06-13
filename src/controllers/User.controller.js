import UsersService from "../services/Users.service.js";

export default class UserController {
    #service;

    constructor(service = new UsersService()) {
        this.#service = service;
    }

    getUsers = async (req, res) => {
        try {
            res.json(await this.#service.getUsers());
        } catch (e) {
            // console.log(e);
            res.status(500).json({ message: e.message });
        }
    };

    registerUser = async (req, res) => {
        const invalidError = new Error("Invalid User");
        try {
            if (!req.body) throw invalidError;
            const newUser = await this.#service.registerUser(req.body);
            if (!newUser._id) throw new Error("Unable to create User");
            res.status(201).json(newUser);
        } catch (e) {
            if (e.message === invalidError.message) {
                res.status(400).json({ message: e.message });
            }
            res.status(500).json({ message: e.message });
        }
    };

}