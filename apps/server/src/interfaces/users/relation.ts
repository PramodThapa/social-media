export enum UserRelation {
  FOLLOW = 'FOLLOW',
}

export enum UserBlogRelation {
  POSTED = 'POSTED',
}

export enum FollowStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum FollowAction {
  DROP = 'DROP',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export enum VertexLabel {
  user = 'user',
  blog = 'blog',
}
