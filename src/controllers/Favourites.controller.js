import FavouritesService from "../services/Favourites.service.js";

export default class FavouritesController {
    #service;


    constructor(service = new FavouritesService()) {
        this.#service = service;
    }

    // Favourite locations methods
    getFavouriteLocations = async (req, res) => {
        try {
            const email = req.email; // Email is extracted from the token by authMiddleware
            const locations = await this.#service.getFavouriteLocations(email);
            res.json(locations);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    addFavouriteLocation = async (req, res) => {
        try {
            const userId = req.userId;
            console.log(userId);
            const { location } = req.body;
            const updatedUser = await this.#service.updateFavouriteLocations(userId, location);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    removeFavouriteLocation = async (req, res) => {
        try {
            const email = req.email;
            const { location } = req.body;
            const updatedUser = await this.#service.removeFavouriteLocation(email, location);
            res.json(updatedUser);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

}