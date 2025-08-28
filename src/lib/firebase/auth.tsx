
'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import { onAuthStateChanged, User} from 'firebase/auth';
import { getAuth } from './client';

const AuthContext = createContext<{user: User | null; loading: boolean;}>({user: null, loading: true});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>;
}
