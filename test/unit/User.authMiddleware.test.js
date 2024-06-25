import authMiddleware from "../../src/middleware/AuthToken.validator.js";
import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'hamza_jwt_not-so-secret_key';

describe("authMiddleware", () => {
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

    it("should return 401 if no authorization header is provided", () => {
        authMiddleware(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Access denied, no token provided' })).to.be.true;
        expect(next.called).to.be.false;
    });

    it("should return 401 if the authorization header has an invalid format", () => {
        req.headers['authorization'] = 'InvalidTokenFormat';

        authMiddleware(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ message: 'Access denied, invalid token format' })).to.be.true;
        expect(next.called).to.be.false;
    });

    it("should return 400 if the token is invalid", () => {
        req.headers['authorization'] = 'Bearer invalidtoken';

        authMiddleware(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid token' })).to.be.true;
        expect(next.called).to.be.false;
    });

    it("should call next if the token is valid", () => {
        const validToken = jwt.sign({ userId: '12345' }, JWT_SECRET);
        req.headers['authorization'] = `Bearer ${validToken}`;

        authMiddleware(req, res, next);

        expect(next.called).to.be.true;
        expect(res.status.called).to.be.false;
        expect(res.json.called).to.be.false;
        expect(req).to.have.property('userId', '12345');
    });
});
