"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Rename Response to ExpressResponse
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var routers_1 = __importDefault(require("./routers/routers")); // Make sure the path is correct
var app = (0, express_1.default)();
// const server: HttpServer = new HttpServer(app);
// const io: SocketIOServer = new socketIO.Server(server, {
//   cors: {
//     origin: '*'
//   }
// });
// Define Message and Response interfaces here
// LATER Look at Gaviali app for clustering and load balance as example
// LATER Look at Blue Ocean Development for socket io
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev')); // Add morgan middleware
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
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
app.use('/', routers_1.default);
server.listen(PORT, function () {
    console.log("Server listening on ".concat(PORT));
});
