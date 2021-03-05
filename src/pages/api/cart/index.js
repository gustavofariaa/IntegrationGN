import gerencianet from '../../../config/gerencianet.config';

export default async (req, res) => {
  const { body } = req;
  const { data } = await gerencianet.createCharge({}, body);
  res.status(200).json({ ...data });
};
