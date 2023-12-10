import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOutUser, loginUser, registerUser } from 'api/firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from 'store/modules/authSlice';

const QUERY_KEY = 'users';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      navigate('/login');
    }
  });

  // 로그인
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      dispatch(setUserInfo(data));
      navigate('/');
    }
  });

  // 로그아웃
  const logOutMutation = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      dispatch(setUserInfo(null));
      navigate('/');
    }
  });

  return {
    registerAuthUser: registerMutation.mutate,
    loginAuthUser: loginMutation.mutate,
    logOutAuthUser: logOutMutation.mutate
  };
  // return { registerAuthUser, loginAuthUser, logOutAuthUser };
};
