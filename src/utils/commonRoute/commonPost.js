import { responseResult, responseBadReq, responseErrors } from '../response';

const Sequelize = require('sequelize');

export default model => async (req, res) => {
  try {
    const data = req.body;
    const newProject = await model.create({
      ...data
    });
    responseResult(res)(newProject);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
};
