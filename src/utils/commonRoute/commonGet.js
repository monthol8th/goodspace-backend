import { responseResult, responseNotFound, responseErrors } from '../response';

export default model => async (req, res) => {
  try {
    const data = await model.findById(req.params.id);
    if (!data) {
      responseNotFound(res)();
    }
    responseResult(res)(data);
  } catch (err) {
    responseErrors(res)(err);
  }
};
