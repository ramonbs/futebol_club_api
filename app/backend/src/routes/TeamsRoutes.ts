import { Router } from 'express';
import TeamsModel from '../models/TeamsModel';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const teamsModel = new TeamsModel();
const teamsService = new TeamsService(teamsModel);
const teamsController = new TeamsController(teamsService);

const router = Router();

router.get('/', (req, res) => {
  teamsController.getTeams(req, res);
});

router.get('/:id', (req, res) => {
  teamsController.getTeamById(req, res);
});

export default router;
