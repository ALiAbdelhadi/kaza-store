export interface AuthUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string | null;
    phone?: string | null;
    created_at: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
    user: AuthUser | null;
    status: AuthStatus;
    isAuthenticated: boolean;
    /**
     * Called by the login page after a successful API response.
     * Stores user + token in the context (and optionally localStorage).
     */
    setSession: (user: AuthUser, token: string) => void;
    clearSession: () => void;
}