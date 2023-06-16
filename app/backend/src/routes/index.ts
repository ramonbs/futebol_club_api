import { Router } from 'express';
import teamsRoutes from './TeamsRoutes';
import userRoutes from './UserRoutes';
import matchesRoutes from './MatchesRoutes';
import leaderboardsRoutes from './LeaderboardsRoutes';

const router = Router();

router.use('/teams', teamsRoutes);
router.use('/login', userRoutes);
router.use('/matches', matchesRoutes);
router.use('/leaderboard', leaderboardsRoutes);

export default router;
