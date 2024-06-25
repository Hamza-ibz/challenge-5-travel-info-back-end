import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import authMiddleware from "../../src/middleware/AuthToken.validator.js";

describe("authMiddleware", () => {
    const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy()
        };
        next = sinon.spy();
    });

    it("should call next if the token is valid", () => {
        const token = jwt.sign({ userId: "12345" }, JWT_SECRET);
        req.headers.authorization = `Bearer ${token}`;

        authMiddleware(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(req.userId).to.equal("12345");
    });

    it("should return 401 if no token is provided", () => {
        authMiddleware(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Access denied, no token provided' })).to.be.true;
        expect(next.notCalled).to.be.true;
    });

    it("should return 401 if the token format is invalid", () => {
        req.headers.authorization = "Bearer ";

        authMiddleware(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Access denied, invalid token format' })).to.be.true;
        expect(next.notCalled).to.be.true;
    });

    it("should return 401 if the token is invalid", () => {
        req.headers.authorization = "Bearer invalidtoken";

        authMiddleware(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid token' })).to.be.true;
        expect(next.notCalled).to.be.true;
    });
});
