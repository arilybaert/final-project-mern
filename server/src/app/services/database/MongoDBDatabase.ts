import { default as mongoose, Connection } from 'mongoose';

import { IConfig } from "../config";
import { ILogger } from "../logger";
import { rejects } from 'assert';

class MongoDBDatabase {
    private config: IConfig;
    private logger: ILogger;
    private db: Connection;


    constructor(logger: ILogger, config: IConfig) {
        this.logger = logger;
        this.config = config;
    }

    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongoose.connect(this.config.mongoDBConnection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(data => {
                this.db = mongoose.connection;
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
}

export default MongoDBDatabase;