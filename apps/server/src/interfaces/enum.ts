export enum FollowStatus {
  ALL = 'all',
  PENDING = 'pending',
  FOLLOWER = 'follower',
  ACCEPTED = 'accepted',
  REQUESTED = 'requested',
  FOLLOWINGS = 'followings',
  SUGGESTIONS = 'suggestions',
}

export enum UserRelation {
  FOLLOW = 'FOLLOW',
}

export enum UserBlogRelation {
  POSTED = 'POSTED',
}

export enum FollowAction {
  CANCEL = 'CANCEL',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  REJECT = 'REJECT',
}

export enum VertexLabel {
  user = 'user',
  blog = 'blog',
}
