import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';
import { default as DateMaker } from '../../utilities/DateMaker';


import { IConfig } from '../config';
import { ILogger } from '../logger';
import { IMessage, Message, IUser, User, Post, IPost, IGameDay, IGame, GameDay, Game } from '../../models/mongoose';
import { GameDayController } from '../../api/controllers';

class MongoDBDatabase {
    private config: IConfig;
    private logger: ILogger;
    private db: Connection;

    private users: Array<IUser>;
    private posts: Array<IPost>;

    private gameDayController: GameDayController;


    constructor(logger: ILogger, config: IConfig) {
        this.logger = logger;
        this.config = config;

        this.users = [];
        this.posts = [];
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
    // CREATE EMPTY MESSAGE
    private messageCreate = async (body: string) => {
        const message = new Message({ body });
        try {
            const newMessage = await message.save()
    
            this.logger.info(`Message created with id ${newMessage._id}`, {});
        } catch(error){
            this.logger.error('An error occured when creating a message', error);
        }
    }

    // FILL MESSAGE
    private createMessages = async () => {
        await Promise.all([
            (async () => this.messageCreate(faker.lorem.paragraph()))
            (),

        ]);
    }

    // CREATE EMPTY USER
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

    // FILL USER
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

    // CREATE EMPTY POST
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

    // FILL POST
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

        GameDay.countDocuments({_id: DateMaker.date()}).exec().then(async (count) => { 
          if(count>0){
              console.log('file found');
              this.gameDayController.createGamedays(DateMaker.date(), DateMaker.date());

          } else {
              console.log('file not found');
              await this.gameDayController.createGamedays()
          }
          return GameDay.findById({_id: DateMaker.date()});
      }); 
        
        
        
        
        // this.games = await GameDay.estimatedDocumentCount().exec().then(async(count) => {

        //   if(count === 0) {
        //     await this.createGamedays()
        //   } 
        //   return GameDay.find().exec()
        // })
      
        // CHECK IF GAMEDAY IS SAVED IN DB


    }
}


export default MongoDBDatabase;