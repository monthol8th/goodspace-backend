import { responseResult, responseBadReq, responseErrors } from '../response';

const Sequelize = require('sequelize');

export default model => async (req, res) => {
  try {
    const data = req.body;
    const row = await model.findById(req.params.id);
    row.set(data);
    const updatedRow = await row.save();
    responseResult(res)(updatedRow);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      responseBadReq(res)(err);
    } else {
      responseErrors(res)(err);
    }
  }
};
