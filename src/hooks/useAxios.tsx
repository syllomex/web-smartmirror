import api from '@/services/api';
import { Method } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const useAxios = <T extends unknown, P extends unknown>(options: {
  path: string;
  method?: Method;
  skip?: boolean;
  headers?: { [key: string]: unknown };
  params?: P | { [key: string]: unknown };
  onCompleted?: (data: T) => void;
  onError?: (error: Error) => void;

  /** Refetch interval in seconds */
  refetchInterval?: number;
}) => {
  const [data, setData] = useState<T | undefined | null>();
  const [error, setError] = useState<Error>();

  const [fetched, setFetched] = useState(false);

  const cached = useRef<string>();

  useEffect(() => {
    (async () => {
      try {
        if (options.skip) return;
        if (fetched) return;

        setFetched(true);

        console.log('fetching');

        const response = await api.request({
          url: options.path,
          method: options.method || 'GET',
          headers: options.headers,
          params: options.params,
        });

        const _data = response.data.data || response.data;

        setData(_data);
        options.onCompleted?.(_data);
      } catch (err) {
        setData(null);
        setError(err);
        options.onError?.(err);
      }
    })();
  }, [options, fetched]);

  useEffect(() => {
    if (!cached.current) {
      cached.current = JSON.stringify(options);
      return;
    }

    if (cached.current === JSON.stringify(options)) return;
    cached.current = JSON.stringify(options);

    setFetched(false);
  }, [options]);

  const refetch = useCallback(async () => {
    try {
      if (options.skip) return;

      const response = await api.request({
        url: options.path,
        method: options.method || 'GET',
        headers: options.headers,
        params: options.params,
      });

      const _data = response.data.data || response.data;
      setData(_data);

      options.onCompleted?.(response.data);
    } catch (err) {
      setData(null);
      setError(err);
      options.onError?.(err);
    }
  }, [options]);

  useEffect(() => {
    if (!options.refetchInterval) return;

    const interval = setInterval(() => {
      refetch();
    }, options.refetchInterval * 1000);

    return () => clearInterval(interval);
  }, [options.refetchInterval, refetch]);

  return { data, error, loading: data === undefined, refetch };
};

export default useAxios;
