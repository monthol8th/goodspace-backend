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
  Worker,
  Camp,
} = require('../db');

const router = Router();

router.get('/', CommonRoute.list(Worker));
router.get('/:id', CommonRoute.get(Worker));
router.put('/:id', CommonRoute.put(Worker));
router.post('/', CommonRoute.post(Worker));

router.get('/search', async (req, res) => {
  try {
    const {
      Op,
    } = Sequelize;
    const {
      name,
      id,
      camp_name: campName,
      p,
    } = req.query;
    if (id) {
      const data = await Worker.findById(req.params.id);

      respondResult(res)({
        data: [data],
        count: 1,
      });
    } else if (campName) {
      const {
        rows: data,
        count,
      } = await Worker.findAndCountAll({
        include: [{
          model: Camp,
          required: true,
          attributes: ['name'],
          where: {
            name: {
              [Op.like]: `%${campName}%`,
            },
          },
        }],
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      respondResult(res)({
        data,
        count,
      });
    } else {
      const {
        rows: data,
        count,
      } = await Worker.findAndCountAll({
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

      respondResult(res)({
        data,
        count,
      });
    };
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
});

export default router;
