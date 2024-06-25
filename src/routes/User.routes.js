import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import registerValidator from "../middleware/Register.validator.js";
import FavouritesController from "../controllers/Favourites.controller.js";
import authMiddleware from "../middleware/AuthToken.validator.js";

export default class UserRoutes {
    #userController;
    #favouritesController;
    #router;
    #routeStartPoint;

    constructor(userController = new UserController(), favouritesController = new FavouritesController(), routeStartPoint = "/") {
        this.#userController = userController;
        this.#favouritesController = favouritesController;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }

    #initialiseRoutes = () => {
        // User routes
        this.#router.get("/getUsers", this.#userController.getUsers);
        this.#router.post("/register", registerValidator.validate(), registerValidator.checkDuplicateEmail(), this.#userController.registerUser);
        this.#router.post("/login", this.#userController.loginUser);
        this.#router.post("/update-password", authMiddleware, this.#userController.updatePassword);


        // Favourite locations routes
        this.#router.get("/favouriteLocations", authMiddleware, this.#favouritesController.getFavouriteLocations);
        this.#router.post("/favouriteLocations", authMiddleware, this.#favouritesController.addFavouriteLocation);
        this.#router.delete("/favouriteLocations", authMiddleware, this.#favouritesController.removeFavouriteLocation);
    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}


