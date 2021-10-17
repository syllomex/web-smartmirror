import React, { useEffect, useState } from 'react';
import nookies from 'nookies';

type AuthContextT = {
  user?: User;
};

type User = {
  _id: string;
  name: string;
  googleId: string;
  googleAccessToken: string;
  googleRefreshToken: string;
  createdAt: string;
  updatedAt: string;
};

const AuthContext = React.createContext({} as AuthContextT);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const cookies = nookies.get();

    const user = cookies['smart-mirror.user'];

    if (!user) return;

    setUser(JSON.parse(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const { user } = React.useContext(AuthContext);
  return { user };
};

export { AuthProvider, useAuth };
