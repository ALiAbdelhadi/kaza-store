'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from 'react';
import { AuthContextValue, AuthStatus, AuthUser } from '@/types/auth';

const STORAGE_KEY_USER  = 'kaza_user';
const STORAGE_KEY_TOKEN = 'kaza_token';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user,   setUser]   = useState<AuthUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>('idle');

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_USER);
            if (raw) {
                const parsed = JSON.parse(raw) as AuthUser;
                setUser(parsed);
                setStatus('authenticated');
            } else {
                setStatus('unauthenticated');
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY_USER);
            localStorage.removeItem(STORAGE_KEY_TOKEN);
            setStatus('unauthenticated');
        }
    }, []);

    const setSession = useCallback((nextUser: AuthUser, token: string) => {
        try {
            localStorage.setItem(STORAGE_KEY_USER,  JSON.stringify(nextUser));
            localStorage.setItem(STORAGE_KEY_TOKEN, token);
        } catch {
            // localStorage unavailable (private browsing, quota exceeded)
        }
        setUser(nextUser);
        setStatus('authenticated');
    }, []);

    const clearSession = useCallback(() => {
        try {
            localStorage.removeItem(STORAGE_KEY_USER);
            localStorage.removeItem(STORAGE_KEY_TOKEN);
        } catch {
            // ignore
        }
        setUser(null);
        setStatus('unauthenticated');
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                status,
                isAuthenticated: status === 'authenticated' && user !== null,
                setSession,
                clearSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside <AuthProvider>');
    }
    return ctx;
}

export function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(STORAGE_KEY_TOKEN);
    } catch {
        return null;
    }
}