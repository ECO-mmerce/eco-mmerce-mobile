import React from 'react';
import io from 'socket.io-client';
const SOCKET_URL = 'http://ecommerce.marcotiger.my.id';

export const socket = io(SOCKET_URL);
export default SocketContext = React.createContext(socket);
