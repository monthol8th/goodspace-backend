import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq
} from '../utils/response';

const Sequelize = require('sequelize');
const { Camp } = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Camp));
router.get('/:id', CommonRoute.get(Camp));
router.put('/:id', CommonRoute.put(Camp));
router.post('/', CommonRoute.post(Camp));

export default router;
