import {
  Router
} from 'express';
import {
  respondResult,
  respondErrors,
  respondSuccess,
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
    const data = await Project.findAll();
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
    const data = await Project.findById(req.params.id);
    if (!data) {
      respondNotFound(res)();
    }
    respondResult(res)(data);
  } catch (err) {
    respondErrors(res)(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newProject = await Project.create({
      id: data.id,
      name_th: data.name_th,
      name_eng: data.name_eng,
      province: data.province,
      start_date: data.start_date,
      finish_date: data.finish_date,
      manager_contact: data.manager_contact,
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
