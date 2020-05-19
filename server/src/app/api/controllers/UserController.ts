import { Request, Response, NextFunction } from "express";
import { User, IUser } from '../../models/mongoose';
import  AuthService  from '../../services/auth';
import IConfig from '../../services/config';
import {UserSeeder} from '../seeder';
class UserController {
  private userSeeder: UserSeeder

    private authService: AuthService;
    private config: IConfig;
  
    constructor(config: IConfig, authService: AuthService) {
      this.config = config;
      this.authService = authService;
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

  // AUTH
    signupLocal = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response | void> => {
      const { email, password } = req.body;
  
      let foundUser = await User.findOne({ email: email });
      if (foundUser) {
        return res.status(403).json({ error: 'Email is already in use' });
      }
  
      const newUser: IUser = new User({
        email: email,
      });
  
      const user: IUser = await newUser.save();
  
      const token = this.authService.createToken(user);
      return res.status(200).json({
        email: user.email,
        token: `${token}`,
        strategy: 'local',
        role: user.role,
        avatar: user.profile.avatar,
      });
    };

    signInLocal = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<void> => {
        this.authService.passport.authenticate(
          'local',
          { session: this.config.auth.jwt.session },
          (err, user, info) => {
            if (err) {
              return next(err);
            }
            if (!user) {
                return 'not found';
                // return next(new NotFoundError());
            }
            const token = this.authService.createToken(user);
            return res.status(200).json({
              email: user.email,
              token: `${token}`,
              strategy: 'local',
              role: user.role,
              avatar: user.profile.avatar,
            });
          },
        )(req, res, next);
      };
}

export default UserController