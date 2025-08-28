'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {app} from './client';
import { Spinner } from '@/components/ui/spinner';
import { usePathname, useRouter } from 'next/navigation';

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
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== '/login') {
            router.replace('/login');
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="large" />
            </div>
        )
    }

    if (!user && pathname !== '/login') {
        return null;
    }

    return <>{children}</>;
}
