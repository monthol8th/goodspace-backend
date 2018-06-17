import { Router } from 'express';

import CommonRoute from '../utils/commonRoute';

import { respondResult, respondErrors, respondBadReq } from '../utils/response';

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

    respondResult(res)({
      data,
      count
    });
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
});

export default router;
