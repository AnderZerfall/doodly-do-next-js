// import express from 'express';
// import { createServer } from 'node:http';
// import { Server } from 'socket.io';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin:['http://localhost:3001', "https://doodly-do-next-js.vercel.app/"],
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors({
//   origin: ["http://localhost:3001", "https://doodly-do-next-js.vercel.app/"],
//   methods: ["GET", "POST"],
// }));

// let drawings = {};

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('draw', (paths) => {
//     console.log('user draw something');
//     drawings[socket.id] = paths;
//     socket.broadcast.emit('draw', paths);
//   });

//     socket.on('disconnect', () => {
//       console.log('user have disconnected');
//       delete drawings[socket.id];
//   })
// });

// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });

