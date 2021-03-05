import StatusCodes from 'http-status-codes';

import gerencianet from '../../../../config/gerencianet.config';

export default async (req, res) => {
  const { query } = req;

  try {
    const { data } = await gerencianet.cancelCharge(query);
    res.statusCode = StatusCodes.OK;
    res.end(JSON.stringify({ ...data }));
    return;
  } catch (error) {
    res.statusCode = StatusCodes.NOT_FOUND;
    res.end(JSON.stringify({ error }));
  }
};
