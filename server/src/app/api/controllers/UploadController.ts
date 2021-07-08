import { Request, Response, NextFunction } from 'express';

class UploadController {

    constructor () {

    }
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('get')

        } catch(err) {
            
        }
    }
    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
           console.log('post')
        } catch(err) {
        }
    }
};

export default UploadController; 