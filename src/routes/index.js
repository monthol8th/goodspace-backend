import { Router } from 'express';

import project from './project';
import camp from './camp';


const router = Router();

router.use('/projects', project);
router.use('/camps', camp);

export default router;
