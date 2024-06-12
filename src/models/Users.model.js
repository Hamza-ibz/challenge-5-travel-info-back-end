import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    favouriteLocations: [
        {
            location: { type: String, required: true },

        }
    ]
});

const Users = model("Users", usersSchema);

export default Users;

//in genral this file constructs a document to send to db. we use schema to validate the data sent to db
