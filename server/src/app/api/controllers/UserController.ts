import { Request, Response, NextFunction } from "express";
import { User, IUser } from '../../models/mongoose';
import  AuthService  from '../../services/auth';
import IConfig from '../../services/config';
class UserController {

    private authService: AuthService;
    private config: IConfig;
  
    constructor(config: IConfig, authService: AuthService) {
      this.config = config;
      this.authService = authService;
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