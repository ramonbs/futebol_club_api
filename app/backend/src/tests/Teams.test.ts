import * as sinon from "sinon";
import * as chai from "chai";
import { app } from "../app";
import SequelizeTeams from "../database/models/SequelizeTeams";
import { teams } from "./mocks/Teams.mock";
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';

chai.use(chaiHttp);

describe("Teams", () => {
    describe("GET /teams", () => {
        let chaiHttpResponse: Response;
        it("should return all teams", async () => {

            sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

            chaiHttpResponse = await chai.request(app).get("/teams");

            chai.expect(chaiHttpResponse.status).to.equal(200);
            chai.expect(chaiHttpResponse.body).to.be.an("array");
            chai.expect(chaiHttpResponse.body).to.deep.equal(teams);
        });

        it("should return a team by id", async () => {
            sinon.stub(SequelizeTeams, 'findByPk').resolves(teams[0] as any);

            const res = await chai.request(app).get("/teams/1");

            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.be.an("object");
            chai.expect(res.body).to.deep.equal(teams[0]);
        })

        it('should return a message when team is not found', async function() {
            sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
        
            chaiHttpResponse = await chai.request(app).get("/teams/1");

            chai.expect(chaiHttpResponse.status).to.equal(404);
            chai.expect(chaiHttpResponse.body).to.be.an("object");
            chai.expect(chaiHttpResponse.body).to.deep.equal({ message: "Teams not found" });
          });

        afterEach(sinon.restore);
    });
});
