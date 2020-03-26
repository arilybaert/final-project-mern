import { Request, Response, NextFunction } from "express";
import {NotFoundError} from '../utilities';

class FallbackController {
    public index(req: Request, res: Response, next: NextFunction): Response<any> | void {
        return next(new NotFoundError());
    }; 
}

export default FallbackController;