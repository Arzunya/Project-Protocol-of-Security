import Express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";
import {Server}  from "socket.io";
import http from "http";


const app = Express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

app.use(Express.json({ limit: "1mb" }));
app.use(Express.urlencoded({ limit: "1mb", extended: true }));
app.use("/api/public", Express.static("./public"));
setupMiddlewares(app);
setupRoutes(app);


export {serverHttp, io}
