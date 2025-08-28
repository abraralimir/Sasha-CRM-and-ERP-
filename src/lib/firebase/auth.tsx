'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {app} from './client';
import { Spinner } from '@/components/ui/spinner';

const AuthContext = createContext<{user: User | null; loading: boolean;}>({user: null, loading: true});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>;
}

export function AuthGuard({children}: {children: React.ReactNode}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="large" />
            </div>
        )
    }

    return <>{children}</>;
}
