import express, { Request, Response as ExpressResponse, Express } from 'express'; // Rename Response to ExpressResponse
import morgan from 'morgan';
import cors from 'cors';
import { Server as HttpServer } from 'http';
import socketIO, { Server as SocketIOServer, Socket } from 'socket.io';
import router from './routers/routers'; // Make sure the path is correct
import controllers from './controllers'; // Make sure the path is correct
import { Message, Response } from './types'; // Import the Message and Response interfaces

const app: Express = express();
// const server: HttpServer = new HttpServer(app);
// const io: SocketIOServer = new socketIO.Server(server, {
//   cors: {
//     origin: '*'
//   }
// });

// Define Message and Response interfaces here
// LATER Look at Gaviali app for clustering and load balance as example
// LATER Look at Blue Ocean Development for socket io

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // Add morgan middleware

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// io.on('connection', (socket: Socket) => {
//   console.log('connected', socket.id);
//   socket.join('1');
//   socket.on('message', async (message: Message) => {
//     try {
//       const response: Response = await controllers.messages._postMessage(message);
//       if (response.recipient_id === 0) {
//         io.to(message.channel_id).emit('new_message', response);
//       } else if (response.user_id > response.recipient_id) {
//         io.to(`DMs ${response.recipient_id}${response.user_id}`).emit('new_message', response);
//       } else {
//         io.to(`DMs ${response.user_id}${response.recipient_id}`).emit('new_message', response);
//       }
//     } catch (error: any) {
//       console.log(error);
//     }
//   });
// });

app.use('/', router);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
