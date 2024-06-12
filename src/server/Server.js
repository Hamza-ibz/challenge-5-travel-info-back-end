import express from "express";

// in genral the server is there to listen to a port for request/response
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

        this.#app.use(express.json()); // MEGA IMPORTANT FOR PROCESSING req.body. this is used for the the middleware
        this.#app.use(
            this.#router.getRouteStartPoint(),
            this.#router.getRouter()
        );
    };

    close = () => {
        // check if server has a value (not null) if it does then close it. null wont have a method called .close()
        // check if server has a value (not null) if it does then close it. null wont have a method called .close()
        this.#server?.close();
    };
}
