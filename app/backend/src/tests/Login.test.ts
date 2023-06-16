import * as sinon from "sinon";
import * as chai from "chai";
import { app } from "../app";
import SequelizeUser from "../database/models/SequelizeUser";
import {
    token,
    userMock,
    userRegisteredMock,
    validLogin,
} from "./mocks/User.mock";
// @ts-ignore
import chaiHttp = require("chai-http");

import { Response } from "superagent";

chai.use(chaiHttp);

describe("Login", () => {
    let chaiHttpResponse: Response;

    it("should return a token when user is found", async () => {
        const useMock = SequelizeUser.build(userRegisteredMock as any);
        sinon.stub(SequelizeUser, "findOne").resolves(useMock);

        chaiHttpResponse = await chai
            .request(app)
            .post("/login")
            .send(validLogin);

        chai.expect(chaiHttpResponse.status).to.equal(200);
        chai.expect(chaiHttpResponse.body.token).not.to.be.undefined;
    });

    it("should return a 401 error when user is not found", async () => {
        sinon.stub(SequelizeUser, "findOne").resolves(null);

        chaiHttpResponse = await chai
            .request(app)
            .post("/login")
            .send({ email: userMock.email, password: userMock.password });

        chai.expect(chaiHttpResponse.status).to.equal(401);
        chai.expect(chaiHttpResponse.body).to.be.an("object");
        chai.expect(chaiHttpResponse.body).to.have.property("message");
    });

    describe("Login/role", () => {
        it("should return the role if token is valid", async () => {
            chaiHttpResponse = await chai
                .request(app)
                .get("/login/role")
                .set("Authorization", token);

            chai.expect(chaiHttpResponse.status).to.equal(200);
            chai.expect(chaiHttpResponse.body).to.be.an("object");
            chai.expect(chaiHttpResponse.body).to.have.property("role");
            chai.expect(chaiHttpResponse.body.role).to.be.equal("admin");
        });
    });
    afterEach(sinon.restore);
});
