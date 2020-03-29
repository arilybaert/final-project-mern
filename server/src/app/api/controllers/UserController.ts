import { Request, Response, NextFunction } from "express";
import { User } from '../../models/mongoose';

class UserController {
    index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find().sort({_createdAt: -1}).exec();
            return res.status(200).json(users);
        } catch(err) {
            next(err);
        }
    }
    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).sort({_createdAt: -1}).exec();
            return res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }
}

export default UserController