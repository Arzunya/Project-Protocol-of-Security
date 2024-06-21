import {serverHttp, io} from "./main/config/app";

import "./infra/socketIO/socketSeguranca";


serverHttp.listen(Number(process.env.PORT), "0.0.0.0", () => console.log(`Server rodando em http://localhost:${process.env.PORT}`));

io.on('connection', (socket) => {
    console.log(socket.id);
});