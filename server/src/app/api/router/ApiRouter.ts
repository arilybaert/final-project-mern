import {default as express, Router, Application, Request, Response } from 'express';
import passport from "passport";
import { HelloController, PostController, MessageController, UserController, GameDayController, TeamController, GameStatsController, StandingsController, UploadController } from '../controllers';
import multer from 'multer';


class ApiRouter {
    public router: Router;
    private helloController: HelloController;
    private postController: PostController;
    private messageController: MessageController;
    private userController: UserController;
    private gameDayController: GameDayController;
    private teamController: TeamController;
    private gameStatsController: GameStatsController;
    private standingsController: StandingsController;
    private uploadController: UploadController;
    private upload: Object;

    constructor() {
        this.router = express.Router();

        this.registerControllers();
        this.registerRoutes();

        // this.upload = multer({ dest: `/uploads` }); // multer configuration
    }

    private registerControllers (): void {
        this.helloController = new HelloController();
        this.messageController = new MessageController();
        this.postController = new PostController();
        this.userController = new UserController();
        this.gameDayController = new GameDayController();
        this.teamController = new TeamController()
        this.gameStatsController = new GameStatsController();
        this.standingsController = new StandingsController();
        this.uploadController = new UploadController()

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
        this.router.get('/teams/:id', this.teamController.show);
        this.router.get('/gameStats', this.gameStatsController.index);
        this.router.get('/gameStats/:date/:id', this.gameStatsController.show);
        this.router.get('/gameStats/sort/:date/:id', this.gameStatsController.sort);
        this.router.get('/standings/all', this.standingsController.show);

        this.router.post('/auth/signin/', this.userController.signInLocal);
        this.router.post('/auth/signup/', this.userController.signupLocal);
        this.router.get("/auth/facebook", passport.authenticate("facebook"));

        this.router.get("/upload/get", this.uploadController.get);
        this.router.get("/upload/post", this.uploadController.post);

        this.router.get('/gamedays/delete/:id', this.gameDayController.hardDelete);
        this.router.get('/gamedays/softdelete/:id', this.gameDayController.softDelete);
        this.router.get('/gamedays/softundelete/:id', this.gameDayController.softUnDelete);

        this.router.get(
            "/auth/facebook/callback",
            passport.authenticate("facebook", {
            successRedirect: "/",
            failureRedirect: "/fail"
            })
        );
        
        this.router.get("/fail", (req, res) => {
            res.send("Failed attempt");
        });
        
        this.router.get("/", (req, res) => {
            res.send("Success");
        });
    }
}

export default ApiRouter;