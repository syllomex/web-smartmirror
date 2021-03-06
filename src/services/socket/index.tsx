import React, { useMemo } from 'react';
import client, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

type SocketContextT = {
  io: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const SocketContext = React.createContext({} as SocketContextT);

const URI = process.env.NEXT_PUBLIC_API_URL_LOCAL as string;

const createClient = () => client(URI);

const SocketProvider: React.FC = ({ children }) => {
  const io = useMemo(() => createClient(), []);

  return (
    <SocketContext.Provider value={{ io }}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  const { io } = React.useContext(SocketContext);

  return { io };
};

export { useSocket, SocketProvider };
