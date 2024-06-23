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


// import { Router } from "express";
// import UserController from "../controllers/User.controller.js";
// import registerValidator from "../middleware/Register.validator.js";
// import FavouritesController from "../controllers/Favourites.controller.js";
// import authMiddleware from "../middleware/AuthToken.validator.js";


// export default class UserRoutes {
//     #controller;
//     #router;
//     #routeStartPoint;

//     constructor(controller = new UserController(), routeStartPoint = "/") {
//         this.#controller = controller;
//         this.#routeStartPoint = routeStartPoint;
//         this.#router = Router();
//         this.#initialiseRoutes();
//     }


//     #initialiseRoutes = () => {
//         // Temporary route handling function in lieu of real data!
//         // this.#router.get("/", (req, res) => res.end("Getting Todos")); // .end thats the complete response

//         this.#router.get("/getUsers", this.#controller.getUsers); // this says if there is a route (website url) with a slash (/) u do this.#controller.getTodos
//         this.#router.post("/register", registerValidator.validate(), registerValidator.checkDuplicateEmail(), this.#controller.registerUser);
//         this.#router.post("/login", this.#controller.loginUser);

//         this.#router.get("/favouriteLocations", authMiddleware, this.#controller.getFavouriteLocations);
//         this.#router.post("/favouriteLocations", authMiddleware, this.#controller.addFavouriteLocation);
//         this.#router.delete("/favouriteLocations", authMiddleware, this.#controller.removeFavouriteLocation);

//     }

//     getRouter = () => {
//         return this.#router;
//     };

//     getRouteStartPoint = () => {
//         return this.#routeStartPoint;
//     };
// }