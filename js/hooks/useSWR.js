// Import necessary hooks
import { useState, useEffect, useRef, useCallback } from 'https://unpkg.com/preact@10.13.1/hooks/dist/hooks.module.js';

// A simplified SWR-like hook for data fetching with caching
export const useSWR = (key, fetcher, options = {}) => {
    // Destructure options with defaults
    const { 
        revalidateOnMount = true,
        dedupingInterval = 2000, // 2 seconds
        refreshInterval = 0,     // 0 means no auto refresh
        initialData = null
    } = options;

    // States
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [isValidating, setIsValidating] = useState(false);

    // Refs to keep track of the latest request
    const keyRef = useRef(key);
    const fetcherRef = useRef(fetcher);
    const unmountedRef = useRef(false);
    const refreshTimeoutRef = useRef(null);

    // Cache management
    const getCache = () => {
        try {
            const cache = localStorage.getItem(`swr_cache_${key}`);
            if (!cache) return null;
            
            const { data, timestamp } = JSON.parse(cache);
            return { data, timestamp };
        } catch (e) {
            console.warn('Failed to get cache:', e);
            return null;
        }
    };

    const setCache = (data) => {
        try {
            localStorage.setItem(`swr_cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Failed to set cache:', e);
        }
    };

    // Main revalidation function
    const revalidate = useCallback(async () => {
        // Skip if already validating (deduping)
        if (isValidating) return;

        setIsValidating(true);

        try {
            const newData = await fetcherRef.current();
            
            if (!unmountedRef.current) {
                setData(newData);
                setError(null);
                setCache(newData);
            }
        } catch (err) {
            if (!unmountedRef.current) {
                setError(err);
            }
        } finally {
            if (!unmountedRef.current) {
                setIsValidating(false);
            }
        }
    }, [isValidating, key]);

    // Setup auto refresh if needed
    useEffect(() => {
        if (refreshInterval && refreshInterval > 0) {
            refreshTimeoutRef.current = setInterval(() => {
                revalidate();
            }, refreshInterval);
        }

        return () => {
            if (refreshTimeoutRef.current) {
                clearInterval(refreshTimeoutRef.current);
            }
        };
    }, [refreshInterval, revalidate]);

    // Initial data load
    useEffect(() => {
        unmountedRef.current = false;
        keyRef.current = key;
        fetcherRef.current = fetcher;

        // Try to load from cache first
        const cachedData = getCache();
        if (cachedData) {
            setData(cachedData.data);
            
            // If cache is fresh enough (within dedupingInterval), don't revalidate immediately
            const isCacheFresh = Date.now() - cachedData.timestamp < dedupingInterval;
            if (!revalidateOnMount && isCacheFresh) {
                return;
            }
        }

        // Revalidate (fetch fresh data)
        revalidate();

        return () => {
            unmountedRef.current = true;
        };
    }, [key]);

    return {
        data,
        error,
        isValidating,
        revalidate
    };
}; 
