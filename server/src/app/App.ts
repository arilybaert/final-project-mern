/*

Author: drdynscript

*/

import { default as express, Application, NextFunction, Request, Response } from 'express';
import { default as http, createServer, Server } from 'http';

import { default as Router } from './router';
import { GlobalMiddleware } from './middleware';
import { IAppError } from './utilities';
import { default as Config, IConfig} from './services/config';
import { default as Logger, ILogger } from './services/logger';
class App {
    public app: Application;
    private config: IConfig;
    private logger: ILogger;
    private server: Server;
    private router: Router;

    constructor (logger: ILogger, config: IConfig) {
        this.config = config;
        this.logger = logger;
        this.createExpress();
        this.createServer();
    }
    
    // CREATE EXPRESS
    private createExpress(): void {
        this.app = express();
        GlobalMiddleware.load(this.app, __dirname);
        this.createRouter();
        this.app.use(this.clientErrorHandler);
        this.app.use(this.errorHandler);
    }

    private clientErrorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
        if (req.xhr) {
            res.status(404).json({error});
        }
        next(error);
    }

    private errorHandler(
        error: IAppError,
        req: Request,
        res: Response,
        next: NextFunction,
      ): void {
        if (error.status === 404) {
          res.status(404).render('pages/404');
        } else {
          res.status(error.status).render('pages/404');
        }
      }

    // CREATE SERVER
    private createServer(): void {
        this.server = createServer(this.app);
        this.server.on('error', (error?: Error) => {
            // GRACEFULL SHUTDOWN
            this.gracefulShutdown();

        })
        this.server.on('listening', () => {
            this.logger.info(
                `listening on ${this.config.server.host} : ${this.config.server.port}`, {}
            )
        })
    }

    private createRouter(): void {
        this.router = new Router(this.app);
    }

    // START SERVER
    public start(): void{
        this.server.listen(this.config.server.port, this.config.server.host);
    }

    // STOP SERVER
    public stop(): void{
        this.server.close((error?: Error) => {
            this.gracefulShutdown(error);
        })
    }

    //GRACEFULL SHUTDOWN
    private gracefulShutdown(error?: Error) : void {
        this.logger.info('Server is gracefully shutdown', error || {});
        if(error) {
            process.exit(1);
        }
        process.exit();
    }
}

export default App;