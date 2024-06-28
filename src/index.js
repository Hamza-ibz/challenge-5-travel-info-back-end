// go to 10 min SE-2404-A-NodeJS-Session2-23052024 for postman thing

import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import UserRoutes from "./routes/User.routes.js";
Config.load();
const { PORT, HOST, DB_URI } = process.env;

const userRoutes = new UserRoutes();


const server = new Server(PORT, HOST, userRoutes);
const database = new Database(DB_URI);

server.start();
await database.connect();








