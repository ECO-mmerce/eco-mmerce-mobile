import React from 'react';
import io from 'socket.io-client';
const SOCKET_URL = 'http://192.168.100.49:4000';

export const socket = io(SOCKET_URL);
export default SocketContext = React.createContext(socket);