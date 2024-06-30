import { useMutation } from "@tanstack/react-query";
import { onFileUpload } from "~/services/file";

export const useFileUpload = () => {
  return useMutation({
    retry: false,
    mutationFn: (payload: FormData) => onFileUpload(payload),
  });
};
