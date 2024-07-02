import { FollowAction } from "./enums";

export interface UserResponse {
  data: {
    user: User;
    token: Token;
  };
  status: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

export interface FileUploadResponse {
  fileUrl: string;
  message: string;
}

export interface Blog {
  id: string;
  label: string;
  imageUrl?: string;
  authorId: string;
  thumbnail: string;
  createdAt: string;
  contentUrl: string;
  description: string;
}

export interface CreateBlogPayload
  extends Omit<Blog, "id" | "createdAt" | "label"> {}

export interface BlogDetail {
  blog: Blog;
  user: User;
}

export interface ButtonAction {
  name: string;
  handleClick: (from?: string, to?: string) => void;
}

export interface UserFollowPayload {
  followerId: string;
  followeeId: string;
  action: FollowAction;
}
