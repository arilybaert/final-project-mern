/*

Author: drdynscript

*/

import { default as express, Application, NextFunction, Request, Response } from 'express';
import { default as http, createServer, Server } from 'http';

import { default as Router } from './router';
import { GlobalMiddleware } from './middleware';
class App {
    public app: Application;
    private server: Server;
    private router: Router;

    constructor () {
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

    private errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
        if (error['status'] === 404){
            res.status(404).render('pages/404');
        } else {
            res.status(500).json({message: 'status 500 bruv'});
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
            console.log('listening on 8080');
        })
    }

    private createRouter(): void {
        this.router = new Router(this.app);
    }

    // START SERVER
    public start(): void{
        this.server.listen(8080, 'localhost');
    }

    // STOP SERVER
    public stop(): void{
        this.server.close((error?: Error) => {
            this.gracefulShutdown(error);
        })
    }

    //GRACEFULL SHUTDOWN
    private gracefulShutdown(error?: Error) : void {
        if(error) {
            process.exit(1);
        }
        process.exit();
    }
}

export default App;