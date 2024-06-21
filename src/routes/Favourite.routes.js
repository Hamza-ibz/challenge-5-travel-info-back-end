import { Router } from "express";
import FavouritesController from "../controllers/Favourites.controller.js";
import authMiddleware from "../middleware/AuthToken.validator.js";

export default class FavouriteRoutes {
    #controller;
    #router;
    #routeStartPoint;

    constructor(controller = new FavouritesController(), routeStartPoint = "/") {
        this.#controller = controller;
        this.#routeStartPoint = routeStartPoint;
        this.#router = Router();
        this.#initialiseRoutes();
    }


    #initialiseRoutes = () => {

        this.#router.get("/favouriteLocations", authMiddleware, this.#controller.getFavouriteLocations);
        this.#router.post("/favouriteLocations", authMiddleware, this.#controller.addFavouriteLocation);
        this.#router.delete("/favouriteLocations", authMiddleware, this.#controller.removeFavouriteLocation);

    }

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}