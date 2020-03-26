import { Request, Response, NextFunction } from "express";

class HelloController {
    public index(req: Request, res: Response, next: NextFunction): Response<any> | void {
        res.status(200).json({message: 'welcome mern student'})
    }; 
}

export default HelloController;