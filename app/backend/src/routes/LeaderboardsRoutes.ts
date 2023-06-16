import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardMatches';
import LeaderboardModel from '../models/LeaderboardModel';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardModel = new LeaderboardModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const router = Router();

router.get('/home', (req, res) => {
  leaderboardController.getLeaderboard(req, res);
});

export default router;
