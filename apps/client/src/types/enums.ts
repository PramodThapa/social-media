export enum LocalStorageKeys {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  USER = "user",
}

export enum AuthMode {
  LOGIN = "login",
  SIGNUP = "signup",
}

export enum FollowTabs {
  ALL = "ALL",
  PENDING = "PENDING",
  FOLLOWER = "FOLLOWER",
  REQUESTED = "REQUESTED",
  SUGGESTIONS = "SUGGESTIONS",
  FOLLOWINGS = "FOLLOWINGS",
}

export enum FollowAction {
  CANCEL = "CANCEL",
  REJECT = "REJECT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
