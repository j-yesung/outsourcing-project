import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPosts, deletePosts, getPosts, updatePosts } from 'api/firebase';
import { useNavigate } from 'react-router-dom';

const QUERY_KEY = 'posts';

export const usePosts = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 조회
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getPosts
  });
  // 추가
  const addPostsMutation = useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      navigate('/post');
    }
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
    postsLoading,
    __addPosts: addPostsMutation.mutate,
    __updatePosts: updatePostsMutation.mutate,
    __deletePosts: deletePostsMutation.mutate
  };
};
