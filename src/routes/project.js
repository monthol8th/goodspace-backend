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
  Project
} = require('../db');
const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const response = await Project.findById(req.params.id);
    respondResult(res)(response);
  } catch (err) {
    respondErrors(res)(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newProject = await Project.create({
      id: data.id,
      nameTH: data.name_th,
      nameEng: data.name_eng,
      province: data.province,
      startDate: data.start_date,
      finishDate: data.finish_date,
      managerContext: data.manager_context,
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