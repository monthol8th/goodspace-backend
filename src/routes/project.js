import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

const { Project } = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Project));
router.get('/:id', CommonRoute.get(Project));
router.put('/:id', CommonRoute.put(Project));
router.post('/', CommonRoute.post(Project));

export default router;
