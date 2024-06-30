import { endpoints } from "~/constant";
import { http } from "./http";
import { FileUploadResponse } from "~/types/interface";

/**
 * Upload the file.
 *
 * @param {FormData} formData .
 *
 * @returns {Promise<FileUploadResponse>}
 */
export const onFileUpload = async (
  formData: FormData
): Promise<FileUploadResponse> => {
  const response: FileUploadResponse = await http.post(
    endpoints.FILE_UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
