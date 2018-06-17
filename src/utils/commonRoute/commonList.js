import { responseResult, responseBadReq, responseErrors } from '../response';

const Sequelize = require('sequelize');

export default model => async (req, res) => {
  try {
    const { p } = req.query;
    const { rows: data, count } = await model.findAndCountAll({
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
};
