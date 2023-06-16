import { Router } from 'express';
import MatchesModel from '../models/MatchesModel';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import TokenValidator from '../middlewares/TokenValidation';
import MatchValidation from '../middlewares/Matches/validationNewMatch';

const matchesModel = new MatchesModel();
const matchesService = new MatchesService(matchesModel);
const matchesController = new MatchesController(matchesService);

const router = Router();

router.get('/', (req, res) => {
  matchesController.getMatches(req, res);
});

router.patch('/:id/finish', TokenValidator.validateToken, (req, res) => {
  matchesController.updateMatch(req, res);
});

router.patch('/:id', TokenValidator.validateToken, (req, res) => {
  matchesController.updateMatchGoals(req, res);
});

router.post(
  '/',
  TokenValidator.validateToken,
  MatchValidation.validateMatch,
  MatchValidation.validateIfTeamsAreDifferent,
  (req, res) => {
    matchesController.registerMatch(req, res);
  },
);

export default router;
