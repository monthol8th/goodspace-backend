import {
  Router,
} from 'express';

import {
  respondResult,
  respondErrors,
  respondNotFound,
  respondBadReq,
} from '../utils';

const Sequelize = require('sequelize');
const {
  Camp,
} = require('../db');
const router = Router();

router.get('/', async (_, res) => {
  try {
    const row = await Camp.findAll();
    respondResult(res)(row);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
});

router.get('/search', async (req, res) => {
  try {
    const {
      Op,
    } = Sequelize;
    const {
      name,
      location,
    } = req.query;

    const where = name ? {
      name: {
        [Op.like]: `%${name}%`,
      },
    } : {
      location: {
        [Op.like]: `%${location}%`,
      },
    };

    const data = await Camp.findAll({
      where,
    });
    respondResult(res)(data);
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
    const data = await Camp.findById(req.params.id);
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
    const row = await Camp.findById(req.params.id);
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
    const newProject = await Camp.create({
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