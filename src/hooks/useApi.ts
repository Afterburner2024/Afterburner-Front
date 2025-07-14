import { useState, useCallback } from "react";
import axiosInstance from "@/util/axiosInstance";
import { AxiosError, AxiosRequestConfig } from "axios";

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

interface UseApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  execute: (config?: AxiosRequestConfig) => Promise<void>;
}

export function useApi<T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  defaultConfig: AxiosRequestConfig = {}
): UseApiResponse<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await axiosInstance({
          url,
          method,
          ...defaultConfig,
          ...config,
        });

        setState((prev) => ({
          ...prev,
          data: response.data,
          loading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error as AxiosError,
          loading: false,
        }));
      }
    },
    [url, method, defaultConfig]
  );

  return {
    ...state,
    execute,
  };
}

// 자주 사용되는 HTTP 메서드에 대한 편의 훅
export function useGet<T = any>(url: string, config?: AxiosRequestConfig) {
  return useApi<T>(url, "GET", config);
}

export function usePost<T = any>(url: string, config?: AxiosRequestConfig) {
  return useApi<T>(url, "POST", config);
}

export function usePut<T = any>(url: string, config?: AxiosRequestConfig) {
  return useApi<T>(url, "PUT", config);
}

export function useDelete<T = any>(url: string, config?: AxiosRequestConfig) {
  return useApi<T>(url, "DELETE", config);
}
