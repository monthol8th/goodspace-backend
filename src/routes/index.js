import { Router } from 'express';

import project from './project';

const router = Router();

router.use('/projects', project);

export default router;
