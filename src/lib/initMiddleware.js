import Cors from 'cors';

const initMiddleware = (middleware) => (req, res) => new Promise((resolve, reject) => {
  middleware(req, res, (result) => {
    if (result instanceof Error) return reject(result);
    return resolve(result);
  });
});

const methods = ['GET', 'POST', 'PUT', 'DELETE'];
export const cors = initMiddleware(Cors({ methods }));
