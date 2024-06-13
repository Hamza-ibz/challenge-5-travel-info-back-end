// go to 10 min SE-2404-A-NodeJS-Session2-23052024 for postman thing

import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import UserRoutes from "./routes/User.routes.js";
Config.load();
const { PORT, HOST, DB_URI } = process.env;

// console.log(process.env); // shows the file ur running

const userRoutes = new UserRoutes();


const server = new Server(PORT, HOST, userRoutes); // "todoRoutes" is past which goes to the Todo.routes.jsx
const database = new Database(DB_URI);

server.start();
await database.connect();
















// import Config from "./config/Config.js";
// import Database from "./db/Database.js";
// import Server from "./server/Server.js";
// import TodoRoutes from "./routes/Todo.routes.js";

// Config.load();
// const { PORT, HOST, DB_URI } = process.env;

// console.log(process.env); // shows the file ur running

// const todoRoutes = new TodoRoutes();

// const server = new Server(PORT, HOST, todoRoutes); // "todoRoutes" is past which goes to the Todo.routes.jsx
// const database = new Database(DB_URI);

// server.start();
// await database.connect();

// console.log(process.env);
