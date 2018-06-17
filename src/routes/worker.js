import {
  Router
} from 'express';

import CommonRoute from '../utils/commonRoute';

import {
  responseResult,
  responseErrors,
  responseBadReq
} from '../utils/response';

const Sequelize = require('sequelize');
const {
  Worker,
  Camp,
  Child,
} = require('../db');

const router = Router();

router.put('/:id', CommonRoute.put(Worker));
router.post('/', CommonRoute.post(Worker));

router.get('/', async (req, res) => {
  try {
    const { p } = req.query;
    const { rows: data, count } = await Worker.findAndCountAll({
      include: [{
        model: Child
      }],
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
    const newData = {
      ...data.toJSON(),
      Children: children
    }
    responseResult(res)(newData);
  } catch (err) {
    responseErrors(res)(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    const {
      Op
    } = Sequelize;
    const {
      name,
      id,
      camp_name: campName,
      p
    } = req.query;
    if (id) {
      const data = await Worker.findById(req.params.id);

      responseResult(res)({
        data: [data],
        count: 1
      });
    } else if (campName) {
      const {
        rows: data,
        count
      } = await Worker.findAndCountAll({
        include: [{
          model: Camp,
          required: true,
          attributes: ['name'],
          where: {
            name: {
              [Op.like]: `%${campName}%`
            }
          }
        }],
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [
          ['createdAt', 'DESC']
        ]
      });
      responseResult(res)({
        data,
        count
      });
    } else {
      const {
        rows: data,
        count
      } = await Worker.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [
          ['createdAt', 'DESC']
        ]
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

router.get('/stat/nationality', async (req, res) => {
  try {
    const result = await Worker.findAll({
      attributes: [
        'nationality', [Sequelize.fn('COUNT', 'nationality'), 'count']
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