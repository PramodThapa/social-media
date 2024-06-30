import { endpoints } from "~/constant";
import { http } from "./http";
import { AxiosResponse } from "axios";
import { Blog, CreateBlogPayload } from "~/types/interface";
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
