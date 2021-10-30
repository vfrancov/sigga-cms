import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";

export const config: SocketIoConfig = { url: environment.socketServer, options: {} };
