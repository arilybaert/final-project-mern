import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';
import { default as fetch } from 'node-fetch';

import { IConfig } from '../config';
import { ILogger } from '../logger';
import { IMessage, Message, IUser, User, Post, IPost, IGameDay, IGame, GameDay, Game } from '../../models/mongoose';

class MongoDBDatabase {
    private config: IConfig;
    private logger: ILogger;
    private db: Connection;

    private users: Array<IUser>;
    private posts: Array<IPost>;
    private gameDays: Array<IGameDay>;

    private games: Array<IGame>;

    private date: string;

    public tempGames: Array<string> = [];

    constructor(logger: ILogger, config: IConfig) {
        this.date = "20200311";
        this.logger = logger;
        this.config = config;

        this.users = [];
        this.posts = [];
        this.gameDays = [];
        this.tempGames = [];
    }

    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongoose.connect(this.config.mongoDBConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
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

    private messageCreate = async (body: string) => {
        const message = new Message({ body });
        try {
            const newMessage = await message.save()
    
            this.logger.info(`Message created with id ${newMessage._id}`, {});
        } catch(error){
            this.logger.error('An error occured when creating a message', error);
        }
    }

    private createMessages = async () => {
        await Promise.all([
            (async () => this.messageCreate(faker.lorem.paragraph()))
            (),

        ]);
    }
    private userCreate = async (
        email: string,
        password: string,
        role: string,
        firstName: string,
        lastName: string,
        avatar: string,
      ) => {
        const userDetail = {
          email,
          localProvider: {
            password,
          },
          role,
          profile: {
            firstName,
            lastName,
            avatar,
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

    private createUsers = async () => {
        const promises = [];
    
        this.userCreate(
          'drdynscript@gmail.com',
          'nmdgent007!',
          'administrator',
          'Philippe',
          'De Pauw - Waterschoot',
          'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/42580828_10214673932035654_3017264055002857472_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_oc=AQkUCFAyscOEkhhfuiS4Fq4sY8_1_l56xU0xQurtXuVXLu3ipVfwpCB0eSPIcRhoFLI&_nc_ht=scontent-bru2-1.xx&oh=b032a18ceb8fc6e7e678f676cf356a4e&oe=5EA14E2B',
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
    private postCreate = async (
      title: string,
      synopsis: string,
      body: string,
    ) => {
      const postDetail = {
        title,
        synopsis,
        body,
      };
  
      const post: IPost = new Post(postDetail);
  
      try {
        const createdPost = await post.save();
        this.posts.push(createdPost);
  
        this.logger.info(`Gameday created with id: ${createdPost._id}`, {});
      } catch (err) {
        this.logger.error(`An error occurred when creating a Post ${err}`, err);
      }
    };

  private createPosts = async () => {
      const promises = [];
  
      for (let i = 0; i < 16; i++) {
        promises.push(
          this.postCreate(
            faker.lorem.sentence(),
            faker.lorem.paragraph(),
            `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          ),
        );
      }
  
      return await Promise.all(promises);
    };

  // NEW GAMEDAY
  private gameDayCreate = async (
    _id: string,
    games: Array<IGame>,
  ) => {
    const gameDayDetail = {
      _id,
      games,
    };

    const gameDay: IGameDay = new GameDay(gameDayDetail);

    try {
      const createdGameDay = await gameDay.save();
      this.gameDays.push(createdGameDay);

      this.logger.info(`Psot created with id: ${createdGameDay._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a gameday ${err}`, err);
    }
  };

  // PUT DATA IN GAMEDAYS
  private createGamedays = async () => {
      const promises = [];
      const games = [];
      let data = await this.getGames();
      data.games.forEach(function (game) {
        const _id = game.gameId;
        const isStartTimeTBD = game.isStartTimeTBD;
        const isGameActivated = game.isGameActivated;
        const startTimeEastern = game.startTimeEastern;
        const startDateEastern = game.startDateEastern;
        const startTimeISO = game.startTimeUTC;
        const vTeam = game.vTeam.teamId;
        const vTeamTricode = game.vTeam.triCode;
        const vTeamScore = game.vTeam.score;
        const hTeam = game.hTeam.teamId;
        const hTeamTricode = game.hTeam.triCode;
        const hTeamScore = game.hTeam.score;
        
        games.push({
          _id,
          isStartTimeTBD,
          isGameActivated,
          startTimeEastern,
          startDateEastern,
          startTimeISO,
          vTeam,
          vTeamTricode,
          vTeamScore,
          hTeam,
          hTeamTricode,
          hTeamScore,
});
      })

        promises.push(
          this.gameDayCreate(
            this.date,
            games,
          ),
        );


      return await Promise.all(promises);
    };

  // GET GAMES FROM API
  private getGames = async () => {
    const url = `http://data.nba.net/10s/prod/v1/${this.date}/scoreboard.json`;
    const response = await fetch(url);
    return response.json();
  }

  // SEED DATA TO DB
  public seed = async () => {
      const messages = await Message.estimatedDocumentCount().exec()
          .then(async count => {
              if(count === 0) {
                  await this.createMessages();
              } 
              return Message.find().exec();
          });

          this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
                  if(count === 0) {
                      await this.createUsers()
                  }
                  return User.find().exec();
              })

            this.posts = await Post.estimatedDocumentCount().exec().then(async (count) => {
              if(count === 0) {
                  await this.createPosts()
              }
              return Post.find().exec();
          })

          this.gameDays = await GameDay.estimatedDocumentCount().exec().then(async(count) => {
            if(count === 0) {
              await this.createGamedays()
            }
            return GameDay.find().exec()
          })
  }
}


export default MongoDBDatabase;