import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
    token,
    userMock,
    userRegisteredMock,
    validLogin,
} from "./mocks/User.mock";

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import SequelizeMatches from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
    it('should return all matches', async () => {
        const chaiHttpResponse: Response = await chai
            .request(app)
            .get('/matches');

        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('should finish a match in progress', async () => {
        const matchMock = SequelizeMatches.build({
            id: 1,
            homeTeamId: 1,
            awayTeamId: 2,
            homeTeamGoals: 0,
            awayTeamGoals: 0,
        });

        sinon.stub(SequelizeMatches, 'findOne').resolves(matchMock);

        const chaiHttpResponse: Response = await chai
            .request(app)
            .patch('/matches/1/finish')
            .set('Authorization', token);

        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('should create a new match', async () => {
        const chaiHttpResponse: Response = await chai
            .request(app)
            .post('/matches')
            .set('Authorization', token)
            .send({
                homeTeamId: 1,
                awayTeamId: 2,
                homeTeamGoals: 0,
                awayTeamGoals: 0,
            });

        expect(chaiHttpResponse.status).to.equal(201);
        expect(chaiHttpResponse.body).to.be.an('object');
    })

    afterEach(sinon.restore);
});