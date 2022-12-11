import ioClient from 'socket.io-client';

const socket = ioClient(import.meta.env.VITE_APP_WS_URL);

export const io = socket;
