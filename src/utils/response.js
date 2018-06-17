export const responseErrors = res => err =>
  res.status(err.code || 500).send(err || { message: 'Internal Error' });

export const responseResult = res => result => res.status(200).send(result);

export const responseSuccess = res => () =>
  res.status(200).send({ message: 'Success' });

export const responseNotFound = res => () =>
  res.status(404).send({ message: 'Not found' });

export const responseBadReq = res => err =>
  res.status(400).send({ message: err.errors || 'Bad Request' });
