import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';


import { IConfig } from '../config';
import { ILogger } from '../logger';
import { IGameDay, IGame, GameDay, Game, IUser, User } from '../../models/mongoose';
import { GameDayController } from '../../api/controllers';

class MongoDBDatabase {
    private config: IConfig;
    private logger: ILogger;
    private db: Connection;

    private users: Array<IUser>;

    private gameDayController: GameDayController;


    constructor(logger: ILogger, config: IConfig) {
        this.logger = logger;
        this.config = config;

        this.users = [];
        this.gameDayController = new GameDayController();

    }

    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongoose.connect(this.config.mongoDBConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(data => {
                this.db = mongoose.connection;
                this.logger.info('Connected to the mongodb database', {});
                resolve(true);
            })
            .catch(error => {
                this.logger.error('Can\'t connect to the db', error);
                reject(error);
            })
        })

    }
    public disconnect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.close(true)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                this.logger.error('Can\'t disconnect from  the db', error);

                reject(error);
            })
        })
    }


    // CREATE EMPTY USER
    private userCreate = async (
        email: string,
        password: string,
        role: string,
        firstName: string,
        lastName: string,
        picture: string,
      ) => {
        const userDetail = {
          email,
          password,
          role,
          profile: {
            firstName,
            lastName,
            picture,
          },
        };
    
        const user: IUser = new User(userDetail);
    
        try {
          const createdUser = await user.save();
          this.users.push(createdUser);
    
          this.logger.info(`User created with id: ${createdUser._id}`, {});
        } catch (err) {
          this.logger.error(`An error occurred when creating a user ${err}`, err);
        }
      };

    // FILL USER
    private createUsers = async () => {
        const promises = [];
    
        this.userCreate(
          'test@test.com',
          'azerty',
          'administrator',
          'Ari',
          'Lybaert',
          'https://www.ocregister.com/wp-content/uploads/2020/01/ocfqup-01.web_.lakers1ccc51599-1.jpg?w=620',
        );
    
        for (let i = 0; i < 30; i++) {
          const gender = Math.round(Math.random());
          promises.push(
            this.userCreate(
              faker.internet.email(),
              'nmdgent007!',
              'user',
              faker.name.firstName(gender),
              faker.name.lastName(gender),
              faker.internet.avatar(),
            ),
          );
        }
    
        return await Promise.all(promises);
      };

    // SEED DATA TO DB
    public seed = async () => {


      this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
              if(count === 0) {
                  await this.createUsers()
              }
              return User.find().exec();
          })
        }
}


export default MongoDBDatabase;