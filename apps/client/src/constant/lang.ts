export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const QUERY_KEY = {
  USER: "user",
};

export const FORM_VALIDATION_MESSAGE = {
  REQUIRED: (fieldName: string) => `Please enter the ${fieldName}.`,
  MIN_LENGTH: (fieldName: string, length: number) =>
    `${fieldName} must be at least ${length} long.`,
  MATCH: (fieldName: string) => `${fieldName} should match.`,
  TYPE_VALID: (fieldName: string) => `Please enter valid ${fieldName}.`,
};

export const SUCCESS_MESSAGE = {
  ADD: (fieldName: string) => `Successfully added ${fieldName}.`,
  DELETE: (fieldName: string) => `Successfully deleted ${fieldName}.`,
  UPDATE: (fieldName: string) => `Successfully updated ${fieldName}.`,
};
