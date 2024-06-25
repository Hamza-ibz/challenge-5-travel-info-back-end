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

});
