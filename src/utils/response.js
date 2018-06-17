export const respondErrors = res => err =>
  res.status(err.code || 500).send(err || { message: 'Internal Error' });

export const respondResult = res => result => res.status(200).send(result);

export const respondSuccess = res => () =>
  res.status(200).send({ message: 'Success' });

export const respondNotFound = res => () =>
  res.status(404).send({ message: 'Not found' });

export const respondBadReq = res => err =>
  res.status(400).send({ message: err.errors || 'Bad Request' });
