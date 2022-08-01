import cors from 'cors';
import express from 'express';
import routes from './routes';
import { AppDataSource } from './typeorm/data-source';

AppDataSource.initialize().then(() => {
    console.log('Database has connected with successfully...');
    
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(routes);

    return app.listen(process.env.HTTP_PORT || 80, () => {
        console.log('Http Server in port '+process.env.HTTP_PORT+' has initialize with successfully...');
    });
}).catch(error => {
    console.log('=====Error=====' + error);
});