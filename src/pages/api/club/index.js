import gerencianet from '../../../config/gerencianet.config';
import { cors } from '../../../lib/initMiddleware';

export default async (req, res) => {
  await cors(req, res);

  const { body: { email } } = req;

  const params = { id: 7353 };
  const subscriptionBody = {
    items: [{
      name: `Inscrito ${email}`,
      value: 1990,
      amount: 1,
    }],
  };

  const { data } = await gerencianet.createSubscription(params, subscriptionBody);
  res.status(200).json({ ...data });
};
