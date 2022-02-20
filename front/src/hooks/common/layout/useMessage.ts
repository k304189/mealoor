import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type showToastProps = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

type T = {
  showToast: (props: showToastProps) => void;
  successToast: (title: string) => void;
  errorToast: (title: string) => void;
  warningToast: (title: string) => void;
  infoToast: (title: string) => void;
};

export const useMessage = (): T => {
  const toast = useToast();

  const showToast = useCallback((props: showToastProps) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
  }, [toast]);

  const successToast = useCallback((title: string) => {
    showToast({ title, status: "success" });
  }, [toast]);

  const errorToast = useCallback((title: string) => {
    showToast({ title, status: "error" });
  }, [toast]);

  const warningToast = useCallback((title: string) => {
    showToast({ title, status: "warning" });
  }, [toast]);

  const infoToast = useCallback((title: string) => {
    showToast({ title, status: "info" });
  }, [toast]);

  return { showToast, successToast, errorToast, warningToast, infoToast };
};
