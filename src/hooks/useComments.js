import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getComments, updateComment } from 'api/firebase';

const QUERY_KEY = 'comments';

export const useComments = () => {
  const queryClient = useQueryClient();

  // 조회
  const { data: comments, isLoading } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getComments
  });
  // 추가
  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
  // 수정
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      console.log('안녕');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
  // 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });

  return {
    comments,
    isLoading,
    addComment: addCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate
  };
};
