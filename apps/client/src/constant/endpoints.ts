const v1Endpoints = {
  ME: "/auth/me",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  ACCESS_TOKEN: "/auth/access-token",

  FILE_UPLOAD: "/files/upload",

  GET_BLOGS: "/blogs",
  CREATE_BLOG: "/blogs/create",
};

type EndPoint = Record<keyof typeof v1Endpoints, string>;

export const endpoints: EndPoint = Object.entries(v1Endpoints).reduce(
  (accumulator, [key, value]) => {
    return {
      ...accumulator,
      [key]: `v1${value}`,
    };
  },
  { ...v1Endpoints }
);
