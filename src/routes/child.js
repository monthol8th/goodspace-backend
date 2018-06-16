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
  Child,
  Worker,
  Camp,
} = require('../db');
const router = Router();

router.get('/', CommonRoute.list(Child));

router.get('/search', async (req, res) => {
  try {
    const {
      Op,
    } = Sequelize;
    const {
      name,
      id,
      camp_name: campName,
      parent_name: parentName,
      p,
    } = req.query;
    if (id) {
      const data = await Child.findById(id);

      respondResult(res)({
        data: [data],
        count: 1,
      });
    } else if (parentName) {
      const {
        rows: data,
        count,
      } = await Child.findAndCountAll({
        include: [{
          model: Worker,
          as: 'Parent',
          required: true,
          where: {
            name: {
              [Op.like]: `%${parentName}%`,
            },
          },
        }],
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      const newData = data.map(row => ({
        ...row.toJSON(),
        parent_name: row.Parent.name,
      }));
      respondResult(res)({
        data: newData,
        count,
      });
    } else if (campName) {
      const {
        rows: data,
        count,
      } = await Child.findAndCountAll({
        include: [{
          model: Worker,
          as: 'Parent',
          required: true,
          attributes: ['name'],
          include: [{
            model: Camp,
            required: true,
            where: {
              name: {
                [Op.like]: `%${campName}%`,
              },
            },
          }],
        }],
        limit: 6,
        offset: 6 * (p - 1 || 0),
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      const newData = data.map(row => ({
        ...row.toJSON(),
        camp_name: row.Parent.Camp.name,
      }));

      respondResult(res)({
        data: newData,
        count,
      });
    } else {
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

router.get('/:id', async (req, res) => {
  try {
    const data = await Child.findById(req.params.id);
    if (!data) {
      respondNotFound(res)();
    }
    respondResult(res)(data);
  } catch (err) {
    respondErrors(res)(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const row = await Child.findById(req.params.id);
    row.set(data);
    const updatedRow = await row.save();
    respondResult(res)(updatedRow);
  } catch (err) {
    respondErrors(res)(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newProject = await Child.create({
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