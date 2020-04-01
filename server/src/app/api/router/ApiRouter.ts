import {default as express, Router, Application, Request, Response } from 'express';
import { HelloController, PostController, MessageController, UserController, GameDayController, TeamController } from '../controllers';


class ApiRouter {
    public router: Router;
    private helloController: HelloController;
    private postController: PostController;
    private messageController: MessageController;
    private userController: UserController;
    private gameDayController: GameDayController;
    private teamController: TeamController;

    constructor() {
        this.router = express.Router();

        this.registerControllers();
        this.registerRoutes();
    }

    private registerControllers (): void {
        this.helloController = new HelloController();
        this.messageController = new MessageController();
        this.postController = new PostController();
        this.userController = new UserController();
        this.gameDayController = new GameDayController();
        this.teamController = new TeamController()

    }

    private registerRoutes(): void {
        this.router.get('/hello', this.helloController.index);
        this.router.get('/posts', this.postController.index);
        this.router.get('/messages', this.messageController.index);
        this.router.get('/messages/:id', this.messageController.show);
        this.router.get('/posts/:id', this.postController.show);
        this.router.get('/users', this.userController.index);
        this.router.get('/users/:id', this.userController.show);
        this.router.get('/gamedays', this.gameDayController.index);
        this.router.get('/gamedays/:id', this.gameDayController.show);
        this.router.get('/teams', this.teamController.index);
    }
}

export default ApiRouter;