import {
  Router
} from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  respondResult,
  respondErrors,
  respondNotFound,
  respondBadReq,
} from '../utils/response';

const Sequelize = require('sequelize');
const {
  Project,
} = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Project));
router.get('/:id', CommonRoute.get(Project));
router.put('/:id', CommonRoute.put(Project));

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newProject = await Project.create({
      ...data,
    });
    respondResult(res)(newProject);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
});

export default router;