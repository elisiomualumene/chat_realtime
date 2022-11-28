import express from "express";
import http from "http"
import path from 'path'
import { Server } from "socket.io";

const App = express();
App.use(express.static(path.join(__dirname, '..', 'public')))
const serverHttp = http.createServer(App)

const io = new Server(serverHttp);

export {serverHttp, io}