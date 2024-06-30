import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "~/constant";

/**
 * Handles the success action.
 *
 * @param {string} message Success message.
 */
export const handleSuccess = (message: string) => {
  toast.success(message);
};

export function error(message: string) {
  toast.error(message);
}

export function handleError(err: unknown) {
  if (err instanceof AxiosError) {
    const message = err.response?.data?.message;
    //TODO:Make more generic to handle with formik bag.
    if (Array.isArray(message)) {
      error(message[0]);
    }

    error(message);
  } else {
    error(ERROR_MESSAGE.GENERIC);
  }
}
