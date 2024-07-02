import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FALLBACK_ID, QUERY_KEY, SUCCESS_MESSAGE } from "~/constant";
import { ROUTE } from "~/constant/route";
import { getBlog, getBlogs, getUserBlogs, postBlog } from "~/services/blog";
import { Blog, BlogDetail, CreateBlogPayload } from "~/types/interface";

export const useCreateBlog = () => {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: (payload: CreateBlogPayload) => postBlog<Blog>(payload),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGE.ADD("blog"));
      navigator(ROUTE.HOME);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.BLOGS],
      });
    },
  });
};

export const useAllBlogs = () => {
  return useQuery<Blog[]>({
    retry: false,
    queryKey: [QUERY_KEY.BLOGS],
    queryFn: getBlogs,
  });
};

export const useBlog = (blogId: number) => {
  return useQuery<BlogDetail>({
    retry: false,
    queryKey: [QUERY_KEY.BLOGS, blogId],
    queryFn: () => getBlog(blogId),
    enabled: blogId !== FALLBACK_ID,
  });
};

//TODO:Refactor
export const useBlogContent = (contentUrl?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.BLOGS, contentUrl],
    queryFn: async () => {
      if (!contentUrl) {
        throw new Error();
      }
      const response = await fetch(contentUrl);
      if (!response.ok) {
        throw new Error();
      }
      return response.text();
    },
    enabled: !!contentUrl,
  });
};

export const useUserBlog = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.BLOGS, id],
    queryFn: () => getUserBlogs(id),
    enabled: id !== FALLBACK_ID,
  });
};
