import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import xss from 'xss-clean';

const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(hpp());
  app.use(xss());
};


export default securityMiddleware