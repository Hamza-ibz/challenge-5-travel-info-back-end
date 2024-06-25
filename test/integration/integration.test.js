import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";
import Config from "../../src/config/Config.js";
import Database from "../../src/db/Database.js";
import Server from "../../src/server/Server.js";
import Users from "../../src/models/Users.model.js";
import UserController from "../../src/controllers/User.controller.js";
import UserRoutes from "../../src/routes/User.routes.js";
import UsersService from "../../src/services/Users.service.js";
import testData from "../data/testUser.js";

const { testUsers, newUser, invalidUser } = testData;

describe("Integration Tests", () => {
    let userServer;
    let userService;
    let database;
    let request;

    before(async () => {
        Config.load();
        const { PORT, HOST, DB_URI } = process.env;
        userService = new UsersService();
        const userController = new UserController(userService);
        const userRoutes = new UserRoutes(userController);
        database = new Database(DB_URI);
        await database.connect();
        userServer = new Server(PORT, HOST, userRoutes);
        userServer.start();
        request = supertest(userServer.getApp());
    });

    after(async () => {
        await userServer.close();
        await database.close();
    });

    beforeEach(async () => {
        try {
            await Users.deleteMany();
            console.log("Database cleared");
        } catch (e) {
            console.log(e.message);
            throw new Error("Error clearing database");
        }
        try {
            await Users.insertMany(testUsers);
            console.log("Database populated with test users");
        } catch (e) {
            console.log(e.message);
            throw new Error("Error inserting test users");
        }
    });
    describe("User Registration Tests", () => {
        it("should register a new user and return 201 status", async () => {
            const response = await request.post("/register").send(newUser);
            expect(response.status).to.equal(201);
        });
        it("should return an error if email is already taken", async () => {
            const response = await request.post("/register").send(testUsers[0]);
            expect(response.status).to.equal(400);
        });
        it("should return an error if password is too short", async () => {
            const response = await request.post("/register").send(invalidUser);
            expect(response.status).to.equal(400);
        });
    });

    describe("Update Password Tests", () => {
        // it("should update the password for an existing user", async () => {
        // const loginResponse = await request.post("/login").send({ email: testUsers[0].email, password: "Password123!" });
        // const token = loginResponse.body.token;
        // const response = await request
        // .post("/update-password")
        // .set("Authorization", `Bearer ${token}`)
        // .send({ currentPassword: "Password123!", newPassword: "NewPassword123!" });
        // expect(response.status).to.equal(200);
        // });
        it("should return an error for incorrect current password", async () => {
            const loginResponse = await request.post("/login").send({ email: testUsers[0].email, password: "Password123!" });
            const token = loginResponse.body.token;
            const response = await request
                .post("/update-password")
                .set("Authorization", `Bearer ${token}`)
                .send({ currentPassword: "WrongPassword", newPassword: "NewPassword123!" });
            expect(response.status).to.equal(401);
        });
        it("should return an error if user not found", async () => {
            const response = await request
                .post("/update-password")
                .set("Authorization", `Bearer invalidtoken`)
                .send({ currentPassword: "Password123!", newPassword: "NewPassword123!" });
            expect(response.status).to.equal(401);
        });
    });
});