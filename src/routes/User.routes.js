import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import registerValidator from "../middleware/Register.validator.js";


export default class UserRoutes {
    #controller;
    #router;
    #routeStartPoint;

    constructor(controller = new UserController(), routeStartPoint = "/") {
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }


    #initialiseRoutes = () => {
        // Temporary route handling function in lieu of real data!
        // this.#router.get("/", (req, res) => res.end("Getting Todos")); // .end thats the complete response

        this.#router.get("/getUsers", this.#controller.getUsers); // this says if there is a route (website url) with a slash (/) u do this.#controller.getTodos
        this.#router.post("/register", registerValidator.validate(), registerValidator.checkDuplicateEmail(), this.#controller.registerUser);
        this.#router.post("/login", this.#controller.loginUser);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}