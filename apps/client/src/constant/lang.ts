export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const QUERY_KEY = {
  USER: "user",
  BLOGS: "blogs",
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

export const AUTH = {
  WITHOUT_ACCOUNT: "Not a member?",
  WITH_ACCOUNT: "Already a member?",
};

export const ERROR_MESSAGE = {
  GENERIC: "Something went wrong!",
};

export const BLOG = {
  CREATE_BLOG: "Create Blog",
};

export const FRIENDS = {
  FRIEND_NAV: "Friends",
  FRIENDS_TAB: [
    { label: "All", index: 1 },
    { label: "Pending", index: 2 },
    { label: "Follower", index: 3 },
    { label: "Requested", index: 4 },
    { label: "Followings", index: 5 },
  ],
};
