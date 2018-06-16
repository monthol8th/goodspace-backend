import { respondResult, respondNotFound, respondErrors } from '../response';

export default model => async (req, res) => {
  try {
    const data = await model.findById(req.params.id);
    if (!data) {
      respondNotFound(res)();
    }
    respondResult(res)(data);
  } catch (err) {
    respondErrors(res)(err);
  }
};
