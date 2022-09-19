import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import { TestRoutes } from './routes/test_route';
import { SessionRoutes } from './routes/session_routes';
import { CommonRoutes } from './routes/common_routes';
import Swagger from '../swagger';

class Server {

  public app: express.Application;

  private sw: Swagger = new Swagger();
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();
  private session_routes: SessionRoutes = new SessionRoutes();

  public static bootstrap(): Server {
    return new Server();
  }

  swaggerUi = require('swagger-ui-express');

  constructor() {
    this.app = express();
    this.config();
    this.app.use('/v1/api-docs', this.swaggerUi.serve, this.swaggerUi.setup(this.sw.SetSwagger()));
    this.test_routes.route(this.app);
    this.session_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
  }
}

export default new Server().app;