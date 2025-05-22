import { io } from "socket.io-client";
import { API_ROOT } from "~/utils/constants";
// create a socket io instance to interact with the base url
export const socketIoInstance = io(API_ROOT);
