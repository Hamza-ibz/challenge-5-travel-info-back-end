import Users from "../models/Users.model.js";

export default class FavouritesService {

    // Favourite locations methods
    getFavouriteLocations = async (userId) => {
        console.log(userId);
        const user = await Users.findOne({ userId });
        if (!user) {
            throw new Error("User not found");
        }
        return user.favouriteLocations;
    };

    updateFavouriteLocations = async (email, location) => {
        const user = await Users.findOneAndUpdate(
            { email },
            { $addToSet: { favouriteLocations: { location } } },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };

    removeFavouriteLocation = async (email, location) => {
        const user = await Users.findOneAndUpdate(
            { email },
            { $pull: { favouriteLocations: { location } } },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    };
}