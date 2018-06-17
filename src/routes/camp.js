import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

import { responseResult, responseErrors, responseBadReq } from '../utils/response';

const Sequelize = require('sequelize');
const { Camp } = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Camp));
router.get('/:id', CommonRoute.get(Camp));
router.put('/:id', CommonRoute.put(Camp));
router.post('/', CommonRoute.post(Camp));

router.get('/search', async (req, res) => {
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

export default router;
