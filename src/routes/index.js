import { Router } from 'express';

import project from './project';
import camp from './camp';
import worker from './worker';
import child from './child';
import vaccine from './vaccine';
import search from './search';
const router = Router();

router.use('/projects', project);
router.use('/camps', camp);
router.use('/workers', worker);
router.use('/children', child);
router.use('/vaccines', vaccine);
router.use('/search', search);

export default router;
