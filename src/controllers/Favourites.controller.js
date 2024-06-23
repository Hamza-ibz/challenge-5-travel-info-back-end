import FavouritesService from "../services/Favourites.service.js";

export default class FavouritesController {
    #service;


    constructor(service = new FavouritesService()) {
        this.#service = service;
    }

    // Favourite locations methods
    getFavouriteLocations = async (req, res) => {
        try {
            const userId = req.userId; // Email is extracted from the token by authMiddleware
            console.log(userId);
            const locations = await this.#service.getFavouriteLocations(userId);
            res.json(locations);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    addFavouriteLocation = async (req, res) => {
        try {
            const userId = req.userId;
            // console.log(userId);
            const { location } = req.body;
            const updatedUser = await this.#service.updateFavouriteLocations(userId, location);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    removeFavouriteLocation = async (req, res) => {
        try {
            const userId = req.userId;
            const { location } = req.body;
            const updatedUser = await this.#service.removeFavouriteLocation(userId, location);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

}