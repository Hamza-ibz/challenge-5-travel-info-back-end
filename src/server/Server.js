import express from "express";
import cors from "cors"; // Import the CORS middleware

// In general, the server is there to listen to a port for request/response
export default class Server {
    #app;
    #host;
    #port;
    #router;
    #server;

    constructor(port, host, router) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#router = router;
    }

    getApp = () => {
        return this.#app;
    };

    start = () => {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(
                `Server is listening on http://${this.#host}:${this.#port}`
            );
        });

        this.#app.use(express.json()); // MEGA IMPORTANT FOR PROCESSING req.body. this is used for the middleware

        // Enable CORS for all routes
        this.#app.use(cors());

        this.#app.use(
            this.#router.getRouteStartPoint(),
            this.#router.getRouter()
        );
    };

    close = () => {
        // Check if server has a value (not null), if it does, then close it.
        this.#server?.close();
    };
}
