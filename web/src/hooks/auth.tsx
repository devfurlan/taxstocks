import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;

  signIn(credentials: ISignInCredentials): Promise<void>;

  signOut(): void;

  updateUser(user: IUser): void;
}

const Auth = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@TaxStocks:token');
    const user = localStorage.getItem('@TaxStocks:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, customer } = response.data;

    localStorage.setItem('@TaxStocks:token', token);
    localStorage.setItem('@TaxStocks:user', JSON.stringify(customer));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user: customer });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TaxStocks:token');
    localStorage.removeItem('@TaxStocks:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@TaxStocks:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <Auth.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </Auth.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(Auth);

  return context;
}

export { AuthProvider, useAuth };
