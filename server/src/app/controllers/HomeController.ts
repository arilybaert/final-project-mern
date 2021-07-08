import { Request, Response, NextFunction } from "express";

class HomeController {
    public index(req: Request, res: Response, next: NextFunction): Response<any> | void {
        res.render('pages/home', {});
    }; 
}

export default HomeController;