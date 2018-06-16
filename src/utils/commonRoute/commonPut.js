import { respondResult, respondBadReq, respondErrors } from '../response';

const Sequelize = require('sequelize');

export default model =>  async (req, res) => {
  try {
    const data = req.body;
    const row = await model.findById(req.params.id);
    row.set(data);
    const updatedRow = await row.save();
    respondResult(res)(updatedRow);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
};
