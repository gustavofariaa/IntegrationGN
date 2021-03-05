import Gerencianet from 'gn-api-sdk-node';

const options = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  sandbox: true,
};

const gerencianet = new Gerencianet(options);

export default gerencianet;
