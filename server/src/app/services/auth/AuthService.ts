import { Request, Response, NextFunction } from 'express';
import { default as passport, PassportStatic } from 'passport';
import { default as passportLocal } from 'passport-local';
import { default as passportFacebook } from 'passport-facebook';
import { default as passportJwt } from 'passport-jwt';
import { default as jwt } from 'jsonwebtoken';

import { Environment, IConfig } from '../config';
import { IUser, User } from '../../models/mongoose';
import { Role } from './auth.types';
// import { UnauthorizedError, ForbiddenError } from '../../utilities';

class AuthService {
  private config: IConfig;
  public passport: PassportStatic;
  private LocalStrategy = passportLocal.Strategy;
  private FacebookStrategy = passportFacebook.Strategy;
  private ExtractJwt = passportJwt.ExtractJwt;
  private JwtStrategy = passportJwt.Strategy;

  constructor(config: IConfig) {
    this.config = config;

    this.initializeLocalStrategy();
    this.initializeJwtStrategy();
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    this.passport = passport;
  }

  private initializeLocalStrategy() {
    passport.use(
      new this.LocalStrategy(
        {
          usernameField: 'email',
        },
        async (email: string, password: string, done) => {
          try {
            const user = await User.findOne({
              email: email,
            });

            if (!user) {
              return done(null, false, { message: 'No user by that email' });
            }

            return user.comparePassword(password, (isMatch: boolean) => {
              if (!isMatch) {
                return done(null, false);
              }
              return done(null, user);
            });
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  }

  private initialiseFacebookStrategy = () => {
    passport.use(new this.FacebookStrategy({
      clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://www.localhost:3000/home"
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, } = profile._json;
      const userData = {
        email,
        
      };
      new User(userData).save();
      done(null, profile);
    }
  ));
  }

  initializeJwtStrategy = () => {
    passport.use(
      new this.JwtStrategy(
        {
          secretOrKey: this.config.auth.jwt.secret,
          jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (jwtPayload, done) => {
          try {
            const { id } = jwtPayload;

            const user = await User.findById(id);
            if (!user) {
              return done(null, false);
            }

            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
        },
      ),
    );
  };

  public createToken(user: IUser): string {
    const payload = {
      id: user._id,
    };
    return jwt.sign(payload, this.config.auth.jwt.secret, {
      expiresIn: 60 * 120,
    });
  }

  public checkIsInRole = (...roles: Array<string>) => (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      // next(new ForbiddenError());
      console.log('forbidden')
    }

    const hasRole = roles.find(role => (req.user as IUser).role === role);
    if (!hasRole) {
    //   next(new UnauthorizedError());
    console.log('unauthorized error');
    }

    return next();
  };
}

export default AuthService;