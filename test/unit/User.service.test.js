import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../src/models/Users.model.js";
import UsersService from "../../src/services/Users.service.js";

describe("UsersService Unit Tests", () => {
    let usersService;

    beforeEach(() => {
        usersService = new UsersService();
    });

    describe("getUsers", () => {
        it("should call find on the Users model", async () => {
            // Arrange
            const findStub = sinon.stub(Users, "find").returns([]);

            // Act
            await usersService.getUsers();

            // Assert
            expect(findStub.calledOnce).to.be.true;
            findStub.restore();
        });

        it("should return the result of calling find on the Users model", async () => {
            // Arrange
            const users = [{ _id: "1", email: "test@example.com" }];
            const findStub = sinon.stub(Users, "find").resolves(users);

            // Act
            const result = await usersService.getUsers();

            // Assert
            expect(result).to.equal(users);
            findStub.restore();
        });

        it("should return an empty array if there are no users", async () => {
            // Arrange
            const users = [];
            const findStub = sinon.stub(Users, "find").returns(users);

            // Act
            const result = await usersService.getUsers();

            // Assert
            expect(result).to.deep.equal(users);
            findStub.restore();
        });
    });

    describe("registerUser", () => {
        it("should hash the password and save the user", async () => {
            // Arrange
            const newUser = { email: "test@example.com", password: "password" };
            const hashedPassword = "hashedPassword";
            const saveStub = sinon.stub(Users.prototype, "save").resolves(newUser);
            const hashStub = sinon.stub(bcrypt, "hash").resolves(hashedPassword);

            // Act
            const result = await usersService.registerUser(newUser);

            // Assert
            expect(hashStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;
            expect(result).to.equal(newUser);
            hashStub.restore();
            saveStub.restore();
        });

        it("should throw an error when saving fails", async () => {
            // Arrange
            const newUser = { email: "test@example.com", password: "password" };
            const error = new Error("Invalid User");
            const saveStub = sinon.stub(Users.prototype, "save").throws(error);
            const hashStub = sinon.stub(bcrypt, "hash").resolves("hashedPassword");

            // Act & Assert
            try {
                await usersService.registerUser(newUser);
                expect.fail("Expected error was not thrown");
            } catch (err) {
                expect(err).to.equal(error);
            }
            hashStub.restore();
            saveStub.restore();
        });
    });

    describe("loginUser", () => {
        it("should return a token for valid credentials", async () => {
            // Arrange
            const user = { _id: "1", email: "test@example.com", password: "hashedPassword" };
            const email = "test@example.com";
            const password = "password";
            const token = "token";
            const findOneStub = sinon.stub(Users, "findOne").resolves(user);
            const compareStub = sinon.stub(bcrypt, "compare").resolves(true);
            const signStub = sinon.stub(jwt, "sign").returns(token);

            // Act
            const result = await usersService.loginUser(email, password);

            // Assert
            expect(findOneStub.calledOnce).to.be.true;
            expect(compareStub.calledOnce).to.be.true;
            expect(signStub.calledOnce).to.be.true;
            expect(result).to.deep.equal({ token });
            findOneStub.restore();
            compareStub.restore();
            signStub.restore();
        });

        it("should throw an error for invalid email", async () => {
            // Arrange
            const email = "invalid@example.com";
            const password = "password";
            const findOneStub = sinon.stub(Users, "findOne").resolves(null);

            // Act & Assert
            try {
                await usersService.loginUser(email, password);
                expect.fail("Expected error was not thrown");
            } catch (err) {
                expect(err.message).to.equal("Invalid credentials for for Email");
            }
            findOneStub.restore();
        });

        it("should throw an error for invalid password", async () => {
            // Arrange
            const user = { _id: "1", email: "test@example.com", password: "hashedPassword" };
            const email = "test@example.com";
            const password = "invalidPassword";
            const findOneStub = sinon.stub(Users, "findOne").resolves(user);
            const compareStub = sinon.stub(bcrypt, "compare").resolves(false);

            // Act & Assert
            try {
                await usersService.loginUser(email, password);
                expect.fail("Expected error was not thrown");
            } catch (err) {
                expect(err.message).to.equal("Invalid credentials for Password");
            }
            findOneStub.restore();
            compareStub.restore();
        });
    });


});
