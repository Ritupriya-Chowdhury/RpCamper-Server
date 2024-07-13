import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app : Application = express()


//parser
app.use(express.json());
app.use(cors());

const getController=(req:Request, res:Response) => {
  res.send('Hello World!')
}


app.get('/', getController);

// application routes
app.use('/api', router);



//Global Error Handler
app.use(globalErrorHandler);

//Not Found route
app.use(notFound);


export default app;