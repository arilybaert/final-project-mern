import App from './app';
import { default as Config, IConfig, Environment} from './app/services/config';
import Logger, { ILogger } from './app/services/logger';
import MongoDBDatabase from './app/services/database/MongoDBDatabase';

// IIFE
(async() => {
    // CREATE CONFIG SERVICE
    const config: IConfig = new Config();

    // CREATE LOGGER SERVICE
    const logger: ILogger = new Logger();
    
    try {

    // CREATE A DB SERVICE
    const mongoDBDatabase = new MongoDBDatabase(logger, config);
    const connected = await mongoDBDatabase.connect();

    if(config.env === Environment.development) {
        mongoDBDatabase.seed();
    }
    logger.info('We have a connection!', connected);

    const app: App = new App(logger, config);
    app.start();

    // STOP ALL RUNNING PROCESSES
    const stopAllProcesses = async () => {
        app.stop();
        await mongoDBDatabase.disconnect();
        console.log('stopAllProcesses');

    }
    // KEYBOARD INTERUPT
    process.on('SIGINT', () => stopAllProcesses());
    process.on('SIGTERM', () => stopAllProcesses());
    }
    catch(error) {
        logger.error('Can\'t launch the application', error);
    }

})()