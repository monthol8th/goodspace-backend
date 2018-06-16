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
router.post('/', CommonRoute.post(Vaccine));

export default router;
