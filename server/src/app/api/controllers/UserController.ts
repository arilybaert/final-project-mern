import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User, UserDocument, AuthToken } from "../../models/mongoose";
import {UserSeeder} from '../seeder';

import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";
import "../../services/config/passport";
class UserController {
  private userSeeder: UserSeeder

  constructor() {
    this.userSeeder = new UserSeeder()

  }
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
hardDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {

      const { id } = req.params;
      const deleted = await User.deleteOne({_id: id}).exec();
      console.log(`deleted: ${id}`);
      console.log(deleted);
      return res.status(200).json(deleted);


  } catch(err) {
      next(err);
  }

}

createUser = async (req: Request, res: Response, next: NextFunction) => {

console.log(req.body);
this.userSeeder.createUsers(
  req.body.email,
  req.body.password,
  req.body.role,
  req.body.firstname,
  req.body.lastname,
);

}

update = async (req: Request, res: Response, next: NextFunction) => {
try {

    const id = req.body.Id;

    const data = {
      'email': req.body.Email,
      'profile': {
        'firstName': req.body.Firstname,
        'lastName': req.body.Lastname,
      },
      'role': req.body.Role,
      '_modifiedAt': Date.now(),
    };

    const user = await User.findOneAndUpdate({_id: id}, data, {new: true});
    return res.status(200).json(user);

} catch(err) {
    next(err);
}

}

softDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {

      const { id } = req.params;
      let user = await User.findById(id)
      user._deletedAt = Date.now();
      await user.save();
      return res.status(200).json(user);
  } catch(err) {
      next(err);
  }
}
softUnDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {

      const { id } = req.params;
      let user = await User.findById(id)
      user._deletedAt = null;
      user.save();
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