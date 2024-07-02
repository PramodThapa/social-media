import { endpoints } from "~/constant";
import { http } from "./http";
import { AxiosResponse } from "axios";
import { Blog, BlogDetail, CreateBlogPayload } from "~/types/interface";
import { interpolate } from "~/utils";

/**
 * Upload the file.
 *
 * @param {CreateBlogPayload} payload .
 *
 * @returns {Promise<AxiosResponse>}
 */
export const postBlog = <T>(
  payload: CreateBlogPayload
): Promise<AxiosResponse<T>> => {
  return http.post(endpoints.CREATE_BLOG, payload);
};

export const getBlogs = async (): Promise<Blog[]> => {
  const url = interpolate(endpoints.GET_BLOGS);

  const response: Blog[] = await http.get(url);

  return response;
};

export const getBlog = async (id: number): Promise<BlogDetail> => {
  const url = interpolate(endpoints.GET_BLOG, { id });

  const response: BlogDetail = await http.get(url);

  return response;
};

export const getUserBlogs = async (id: number): Promise<Blog[]> => {
  const url = interpolate(endpoints.USER_BLOGS, { id });

  const response: Blog[] = await http.get(url);

  return response;
};
