import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User, UserDocument, AuthToken } from "../../models/mongoose";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";
import "../../services/config/passport";
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


/**
 * POST /login
 * Sign in using email and password.
 */
postLogin = async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) { 
          console.log('error :' + err);
          return next(err); }
        if (!user) {
            console.log('user ' + user);
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            console.log('login')
        });
    })(req, res, next);

}

}

export default UserController;