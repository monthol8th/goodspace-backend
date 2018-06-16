import { respondResult, respondBadReq, respondErrors } from '../response';

const Sequelize = require('sequelize');

export default model => async (req, res) => {
  try {
    const data = req.body;
    const newProject = await model.create({
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
};
