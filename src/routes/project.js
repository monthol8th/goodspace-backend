import {
  Router
} from 'express';
import {
  respondResult,
  respondErrors,
  respondNotFound,
  respondBadReq,
} from '../utils';

const Sequelize = require('sequelize');
const {
  Project,
} = require('../db');
const router = Router();

router.get('/', async (_, res) => {
  try {
    const row = await Project.findAll();
    respondResult(res)(row);
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
    const data = await Project.findById(req.params.id);
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
    const row = await Project.findById(req.params.id);
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
    const newProject = await Project.create({
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