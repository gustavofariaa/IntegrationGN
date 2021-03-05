import gerencianet from '../../../config/gerencianet.config';
import { cors } from '../../../lib/initMiddleware';

export default async (req, res) => {
  await cors(req, res);

  const { body } = req;
  const { data } = await gerencianet.createCharge({}, body);
  res.status(200).json({ ...data });
};
