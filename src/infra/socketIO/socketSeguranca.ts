import { io } from "../../main/config/app";

io.on('connection', (socket) => {
    console.log(socket.id,'socket funcionando33');
});