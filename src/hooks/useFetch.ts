import { useState, useEffect } from "react";
import axiosInstance from "@/util/axiosInstance";
import { AxiosError, AxiosRequestConfig } from "axios";

interface UseFetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseFetchOptions extends AxiosRequestConfig {
  enabled?: boolean;
}

export function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
  const { enabled = true, ...axiosOptions } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await axiosInstance({
          url,
          method: "GET",
          ...axiosOptions,
        });

        setState({
          data: response.data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          data: null,
          error: error as AxiosError,
          loading: false,
        });
      }
    };

    fetchData();
  }, [url, enabled, refetchIndex]);

  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  return {
    ...state,
    refetch,
  };
}
