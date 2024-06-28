import mongoose from "mongoose";

// in general this file is used to start a db connection so we can read write delete update (communicate) with the db.
export default class Database {
    // #connectionAttempts = 0;
    #uri; // thing that connects to the correct mongo db

    constructor(uri) {
        this.#uri = uri;
    }

    // async means running a function after something else happens
    connect = async () => {
        // do {
        try {
            // this.#connectionAttempts++;
            // await means ur waiting for a result. if there is no result we catch it (try catch)
            await mongoose.connect(this.#uri);
            return console.log(
                `Database connection to ${this.#uri} was successful`
            );
        } catch (e) {
            console.log("Database connection error", e);
            // setTimeout(() => this.connect(), 3000);
        }
        // }
        // while (connectionAttempts <= 10)
        // connectionAttempts === 10 && console.log("Database unavailable");  
    };

    close = async () => {
        await mongoose.disconnect();
    };
}

// commands:-
// brew services start mongodb-community@7.0
// brew services stop mongodb - community@7.0