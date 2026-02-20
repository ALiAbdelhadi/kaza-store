import { ApiError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

class HttpError extends Error {
    public readonly status: number;
    public readonly errors?: Record<string, string[]>;

    constructor({ message, status, errors }: ApiError) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.errors = errors;
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorData: Partial<ApiError> = { message: response.statusText };
        try {
            errorData = await response.json();
        } catch {
            // use default
        }
        throw new HttpError({
            message: errorData.message ?? 'An unexpected error occurred.',
            status: response.status,
            errors: errorData.errors,
        });
    }
    return response.json() as Promise<T>;
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, String(value));
            }
        });
    }
    return url.toString();
}

export const apiClient = {
    async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
        const response = await fetch(buildUrl(path, params), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            credentials: 'include',
        });
        return handleResponse<T>(response);
    },

    async post<T, B = unknown>(path: string, body?: B): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
        });
        return handleResponse<T>(response);
    },

    async patch<T, B = unknown>(path: string, body?: B): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
        });
        return handleResponse<T>(response);
    },

    async delete<T>(path: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            credentials: 'include',
        });
        return handleResponse<T>(response);
    },
};

export { HttpError };