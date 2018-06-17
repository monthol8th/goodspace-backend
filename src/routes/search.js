import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq
} from '../utils/response';

const Sequelize = require('sequelize');
const { Child, Worker, Camp } = require('../db');
const router = Router();

router.get('/children', async (req, res) => {
  try {
    const { Op } = Sequelize;
    const { name, p } = req.query;
    const { rows: data, count } = await Child.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      },
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


router.get('/camps', async (req, res) => {
  try {
    const { Op } = Sequelize;
    const { name, location, p } = req.query;

    const where = name
      ? {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      : {
          location: {
            [Op.like]: `%${location}%`
          }
        };

    const { rows: data, count } = await Camp.findAndCountAll({
      where,
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

router.get('/workers', async (req, res) => {
  try {
    const { Op } = Sequelize;
    const { name, id, camp_name: campName, p } = req.query;
    if (id) {
      const data = await Worker.findById(req.params.id);

      responseResult(res)({
        data: [data],
        count: 1
      });
    } else if (campName) {
      const { rows: data, count } = await Worker.findAndCountAll({
        include: [
          {
            model: Camp,
            required: true,
            attributes: ['name'],
            where: {
              name: {
                [Op.like]: `%${campName}%`
              }
            }
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
    } else {
      const { rows: data, count } = await Worker.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [['createdAt', 'DESC']]
      });

      responseResult(res)({
        data,
        count
      });
    }
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
});


export default router;
