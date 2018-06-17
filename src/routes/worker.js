import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq
} from '../utils/response';

const Sequelize = require('sequelize');
const { Worker, Camp, Child } = require('../db');

const router = Router();

router.put('/:id', CommonRoute.put(Worker));
router.post('/', CommonRoute.post(Worker));

router.get('/', async (req, res) => {
  try {
    const { p } = req.query;
    const { rows: data, count } = await Worker.findAndCountAll({
      include: [
        {
          model: Child
        }
      ],
      limit: 6,
      offset: 6 * (p - 1 || 0),
      order: [['createdAt', 'DESC']]
    });

    responseResult(res)({
      data,
      count
    });
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Worker.findById(req.params.id);
    if (!data) {
      responseNotFound(res)();
    }
    const children = await data.getChildren();
    const validatedData = {
      ...data.toJSON(),
      Children: children
    };
    responseResult(res)(validatedData);
  } catch (err) {
    responseErrors(res)(err);
  }
});

router.get('/stat/nationality', async (req, res) => {
  try {
    const result = await Worker.findAll({
      attributes: [
        'nationality',
        [Sequelize.fn('COUNT', 'nationality'), 'count']
      ],
      group: ['nationality']
    });
    responseResult(res)(result);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
});

export default router;
