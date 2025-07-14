import { toast, type ToastT } from "sonner";

interface ToastOptions {
  duration?: number;
  position?: ToastT["position"];
  important?: boolean;
}

interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  loading: (message: string, options?: ToastOptions) => void;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => void;
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: "top-center",
};

export function useToast(): UseToastReturn {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...defaultOptions,
      duration: 4000, // 에러는 좀 더 오래 보여줌
      ...options,
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      ...defaultOptions,
      ...options,
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      ...defaultOptions,
      duration: 4000, // 경고도 좀 더 오래 보여줌
      ...options,
    });
  };

  const loading = (message: string, options?: ToastOptions) => {
    toast.loading(message, {
      ...defaultOptions,
      duration: Infinity, // 로딩은 수동으로 닫을 때까지 유지
      ...options,
    });
  };

  const promise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
      ...defaultOptions,
      ...options,
    });
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    promise,
  };
}
