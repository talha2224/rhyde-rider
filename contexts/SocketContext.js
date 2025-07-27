import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import config from "../config";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const initSocket = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (!id) return;

      const socket = io(config.socketUrl, {
        transports: ['websocket'],
        autoConnect: true,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        setSocketConnected(true);
        console.log('✅ Socket connected');
        socket.emit('join', id);
        console.log(`📡 Joined room: ${id}`);
      });

      socket.on('disconnect', () => {
        setSocketConnected(false);
        console.log('❌ Socket disconnected');
      });
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ getSocket: () => socketRef.current, connected: socketConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
