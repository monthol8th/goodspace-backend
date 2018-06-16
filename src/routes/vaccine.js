import {
  Router,
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
  Vaccine,
} = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Vaccine));
router.get('/:id', CommonRoute.get(Vaccine));
router.put('/:id', CommonRoute.put(Vaccine));

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newProject = await Vaccine.create({
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
