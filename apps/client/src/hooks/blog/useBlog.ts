import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QUERY_KEY, SUCCESS_MESSAGE } from "~/constant";
import { ROUTE } from "~/constant/route";
import { getBlogs, postBlog } from "~/services/blog";
import { Blog, CreateBlogPayload } from "~/types/interface";

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
