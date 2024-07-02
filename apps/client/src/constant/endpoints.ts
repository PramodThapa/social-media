const v1Endpoints = {
  ME: "/auth/me",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  ACCESS_TOKEN: "/auth/access-token",

  FILE_UPLOAD: "/files/upload",

  GET_BLOGS: "/blogs",
  GET_BLOG: "/blogs/:id",
  CREATE_BLOG: "/blogs/create",

  USER: "/users/:id",
  USER_BLOGS: "/users/:id/blogs",
  USER_FRIENDS: "/users/:id/follow",

  FOLLOW_USERS: "/users/follow",
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
