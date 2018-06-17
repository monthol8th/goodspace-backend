import {
  Router,
} from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq,
} from '../utils/response';

const Sequelize = require('sequelize');
const {
  Child,
  Worker,
  Camp,
} = require('../db');
const router = Router();

router.get('/children', async (req, res) => {
  try {
    const {
      Op,
    } = Sequelize;
    const {
      name,
      p,
    } = req.query;
    const {
      rows: data,
      count,
    } = await Child.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit: 6,
      offset: 6 * (p - 1 || 0),
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    responseResult(res)({
      data,
      count,
    });
  } catch  (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
});

export default router;
