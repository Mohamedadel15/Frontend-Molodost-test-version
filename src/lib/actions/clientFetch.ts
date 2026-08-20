/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BASE_URL } from "@/constants";

export interface CustomError {
    error: {
        message: string;
        errors: {
            field: string;
            message: string;
        }[];
        throttled?: boolean;
        wait_time_seconds?: number;
    };
    status: number;
    isError: boolean;
}

interface IClientFetchParams {
    endpoint: string;
    method?: "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
    data?: object;
    isFormData?: boolean;
    headers?: Record<string, string>;
    cacheTime?: number;
    skipCache?: boolean;
    includeAuth?: boolean;
}

/*
 * The Molodost API is called without an Accept-Language header on purpose
 * (see server-actions.ts); the cache key is keyed on method + endpoint only.
 */

interface CacheEntry<T> {
    data: T;
    timestamp: number;
    expiry: number;
}

class APICache {
    private memoryCache = new Map<string, CacheEntry<any>>();
    private pendingRequests = new Map<string, Promise<any>>(); // Track pending requests

    set<T>(key: string, data: T, cacheTime: number = 5 * 60 * 1000): void {
        const now = Date.now();
        this.memoryCache.set(key, {
            data,
            timestamp: now,
            expiry: now + cacheTime,
        });
    }

    get<T>(key: string): T | null {
        const entry = this.memoryCache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            this.memoryCache.delete(key);
            return null;
        }

        return entry.data;
    }

    clear(): void {
        this.memoryCache.clear();
        this.pendingRequests.clear();
    }

    delete(key: string): void {
        this.memoryCache.delete(key);
        this.pendingRequests.delete(key);
    }
    // Get all keys matching a pattern
    getKeysMatching(pattern: string): string[] {
        return Array.from(this.memoryCache.keys()).filter(key => key.includes(pattern));
    }

    getStats() {
        return {
            cacheSize: this.memoryCache.size,
            pendingRequests: this.pendingRequests.size,
            cacheKeys: Array.from(this.memoryCache.keys()),
            pendingKeys: Array.from(this.pendingRequests.keys()),
        };
    }

    hasPendingRequest(key: string): boolean {
        return this.pendingRequests.has(key);
    }

    getPendingRequest<T>(key: string): Promise<T> | null {
        return this.pendingRequests.get(key) || null;
    }

    setPendingRequest<T>(key: string, promise: Promise<T>): void {
        this.pendingRequests.set(key, promise);

        // Clean up when promise resolves/rejects
        promise
            .finally(() => {
                this.pendingRequests.delete(key);
            });
    }
}

const apiCache = new APICache();

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        // eslint-disable-next-line prefer-spread
        timeout = setTimeout(() => func.apply(null, args), wait);
    };
}

export async function clientFetch<T>({
    endpoint,
    method = "GET",
    data,
    isFormData,
    headers = {},
    cacheTime = 5 * 60 * 1000,
    skipCache = false,
    includeAuth = false
}: IClientFetchParams): Promise<{
    data: T | null;
    message?: string;
    status?: number;
    error?: CustomError | null;
    fromCache?: boolean;
    fromPending?: boolean;
}> {
    const cacheKey = `${method}:${endpoint}:${JSON.stringify(data || {})}`;

    // Check cache first for GET requests
    if (method === "GET" && !skipCache) {
        const cachedData = apiCache.get<T>(cacheKey);
        if (cachedData) {
            return {
                data: cachedData,
                status: 200,
                fromCache: true,
                error: null,
            };
        }
    }

    if (apiCache.hasPendingRequest(cacheKey)) {
        try {
            const pendingResult = await apiCache.getPendingRequest<T>(cacheKey);
            return {
                data: pendingResult,
                status: 200,
                fromPending: true,
                error: null,
            };
        } catch (error) { }
    }
    // Create new request
    const requestPromise = performFetch<T>({
        endpoint,
        method,
        data,
        isFormData,
        headers: { Accept: "application/json", ...headers },
        cacheKey,
        cacheTime,
        skipCache,
        includeAuth,
    });

    // Track pending request for GET methods
    if (method === "GET" && !skipCache) {
        apiCache.setPendingRequest(cacheKey, requestPromise.then(result => result.data));
    }

    return requestPromise;
}

// Separate function to perform actual fetch
async function performFetch<T>({
    endpoint,
    method,
    data,
    isFormData,
    headers,
    cacheKey,
    cacheTime,
    skipCache,
    includeAuth,
}: {
    endpoint: string;
    method: string;
    data?: object;
    isFormData?: boolean;
    headers: Record<string, string>;
    cacheKey: string;
    cacheTime: number;
    skipCache: boolean;
    includeAuth?: boolean;
}): Promise<{
    data: T | null;
    message?: string;
    status?: number;
    error?: CustomError | null;
    fromCache?: boolean;
}> {
    try {
        const requestHeaders: HeadersInit = {
            ...headers,
        };

        if (!isFormData) {
            requestHeaders["Content-Type"] = "application/json";
        }

        const response = await fetch(BASE_URL + endpoint, {
            method,
            headers: requestHeaders,
            // credentials: "include",
            body: data
                ? isFormData
                    ? (data as FormData)
                    : JSON.stringify(data)
                : null,
        });

        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("json")) {
            return {
                data: null,
                status: response.status,
                message: "Unexpected non-JSON response",
                error: { error: { message: "Unexpected non-JSON response", errors: [] }, status: response.status, isError: true },
                fromCache: false,
            };
        }
        const result = await response.json();

        if (response.ok) {
            // Cache successful GET requests
            if (method === "GET" && !skipCache) {
                apiCache.set(cacheKey, result, cacheTime);
            }

            return {
                data: result,
                status: response.status,
                message: "",
                error: null,
                fromCache: false,
            };
        } else {
            return {
                data: null,
                status: response.status,
                message: response.statusText,
                error: result,
                fromCache: false,
            };
        }
    } catch (error) {
        return {
            data: null,
            status: 500,
            message: "Network error",
            error: {
                error: { message: "Network error", errors: [] },
                status: 500,
                isError: true,
            },
            fromCache: false,
        };
    }
}

// Export cache instance for manual cache management
export { apiCache, debounce };