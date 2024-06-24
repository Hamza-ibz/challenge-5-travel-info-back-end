import { expect } from "chai";
import sinon from "sinon";
import UserController from "../../src/controllers/User.controller.js";

describe("UserController Unit Tests", () => {
    let userController, mockUserService, mockRequest, mockResponse;

    beforeEach(() => {
        mockUserService = {
            getUsers: sinon.stub(),
            registerUser: sinon.stub(),
            loginUser: sinon.stub(),
            updatePassword: sinon.stub(),
        };
        userController = new UserController(mockUserService);
        mockRequest = {
            body: {},
            params: {},
            userId: "1",
        };
        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
        };
    });

    describe("registerUser", () => {
        it("should successfully register a user and return the user data", async () => {
            // Arrange
            const newUser = { _id: "1", email: "newuser@example.com" };
            mockUserService.registerUser.resolves(newUser);
            mockRequest.body = newUser;

            // Act
            await userController.registerUser(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(201)).to.be.true;
            expect(mockResponse.json.calledWith(newUser)).to.be.true;
        });

        it("should return a 400 response when the request body is null", async () => {
            // Arrange
            mockRequest.body = null;

            // Act
            await userController.registerUser(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(400)).to.be.true;
            expect(mockResponse.json.calledWith({ message: "Invalid User" })).to.be.true;
        });

        it("should return a 500 response when an error occurs during user registration", async () => {
            // Arrange
            const error = new Error("Unable to create User");
            mockUserService.registerUser.rejects(error);
            mockRequest.body = { email: "user1@example.com", password: "password" };

            // Act
            await userController.registerUser(mockRequest, mockResponse);

            // Assert
            expect(mockResponse.status.calledWith(500)).to.be.true;
            expect(mockResponse.json.calledWith({ message: error.message })).to.be.true;
        });
    });


});
