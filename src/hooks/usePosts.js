import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePosts, getPosts, updatePosts } from 'api/firebase';
import { useNavigate } from 'react-router-dom';

const QUERY_KEY = 'posts';

export const usePosts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 조회
  const { data: posts } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getPosts
  });

  // 수정
  const updatePostsMutation = useMutation({
    mutationFn: updatePosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
  // 삭제
  const deletePostsMutation = useMutation({
    mutationFn: deletePosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      navigate('/post');
    }
  });

  return {
    posts,
    __updatePosts: updatePostsMutation.mutate,
    __deletePosts: deletePostsMutation.mutate
  };
};
