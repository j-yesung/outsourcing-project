import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getLikes, pressLike } from 'api/firebase';

const QUERY_KEY = 'likes';

export const useLikes = (postId) => {
  const queryClient = useQueryClient();

  const { data: likes, isLoading } = useQuery({
    queryKey: [QUERY_KEY, postId],
    queryFn: (context) => getLikes(context.queryKey[1])
  });

  const pressLikeMutation = useMutation({
    mutationFn: pressLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });

  return { likes, isLoading, increaseLike: pressLikeMutation.mutate };
};
