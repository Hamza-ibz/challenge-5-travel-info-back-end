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

}