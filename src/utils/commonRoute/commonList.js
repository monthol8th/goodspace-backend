import { respondResult, respondBadReq, respondErrors } from '../response';

const Sequelize = require('sequelize');

export default model => async (req, res) => {
  try {
    const {
      p,
    } = req.query;
    const {
      rows: data,
      count,
    } = await model.findAndCountAll({
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
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      respondBadReq(res)(err);
    } else {
      respondErrors(res)(err);
    }
  }
};
