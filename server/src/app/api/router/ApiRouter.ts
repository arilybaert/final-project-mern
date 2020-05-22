import {default as express, Router, Application, Request, Response } from 'express';
import passport from "passport";
import { UserController, GameDayController, TeamController, GameStatsController, StandingsController, UploadController } from '../controllers';
import multer from 'multer';


class ApiRouter {
    public router: Router;

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

        // ERROR WHEN USING MULTER
        // this.upload = multer({ dest: `/uploads` }); // multer configuration
    }

    private registerControllers (): void {

        this.userController = new UserController();
        this.gameDayController = new GameDayController();
        this.teamController = new TeamController()
        this.gameStatsController = new GameStatsController();
        this.standingsController = new StandingsController();
        this.uploadController = new UploadController()

    }

    private registerRoutes(): void {

        this.router.get('/users', this.userController.index);
        this.router.get('/users/:id', this.userController.show);
        
        this.router.get('/gamedays', this.gameDayController.index);
        this.router.get('/gamedays/:id', this.gameDayController.show);
        this.router.get('/gamedays/delete/:id', this.gameDayController.hardDelete);
        this.router.get('/gamedays/softdelete/:id', this.gameDayController.softDelete);
        this.router.get('/gamedays/softundelete/:id', this.gameDayController.softUnDelete);
        this.router.post('/gamedays/update', this.gameDayController.update);

        this.router.post('/teams/update', this.teamController.update);
        this.router.get('/teams', this.teamController.index);
        this.router.get('/teams/all', this.teamController.showAll);
        this.router.get('/teams/:id', this.teamController.show);
        this.router.get('/teams/delete/:id', this.teamController.hardDelete);
        this.router.get('/teams/softdelete/:id', this.teamController.softDelete);
        this.router.get('/teams/softundelete/:id', this.teamController.softUnDelete);

        this.router.get('/gameStats', this.gameStatsController.index);
        this.router.get('/gameStats/:date/:id', this.gameStatsController.show);
        this.router.get('/gameStats/sort/:date/:id', this.gameStatsController.sort);
        this.router.get('/gameStats/delete/:id', this.gameStatsController.hardDelete);
        this.router.get('/gameStats/softdelete/:id', this.gameStatsController.softDelete);
        this.router.get('/gameStats/softundelete/:id', this.gameStatsController.softUnDelete);
        
        this.router.get('/standings/all', this.standingsController.show);
        this.router.get('/standings/delete/:id', this.standingsController.hardDelete);
        this.router.get('/standings/softdelete/:id', this.standingsController.softDelete);
        this.router.get('/standings/softundelete/:id', this.standingsController.softUnDelete);

        // this.router.get('/users/delete/:id', this.userController.hardDelete);
        // this.router.get('/users/softdelete/:id', this.userController.softDelete);
        // this.router.get('/users/softundelete/:id', this.userController.softUnDelete);
        // this.router.post('/users/update', this.userController.update);
        this.router.post('/users/create', this.userController.createUser);
        //
        this.router.post('/auth/signin/', this.userController.postLogin);
        // this.router.post('/auth/signup/', this.userController.signupLocal);

        this.router.get("/upload/get", this.uploadController.get);
        this.router.get("/upload/post", this.uploadController.post);

        
        this.router.get("/fail", (req, res) => {
            res.send("Failed attempt");
        });
        
        this.router.get("/", (req, res) => {
            res.send("Success");
        });
    }
}

export default ApiRouter;