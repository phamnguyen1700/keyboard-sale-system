import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser, registerUser, RegisterPayload } from '@/zustand/services/user';
import { User, UserList } from '@/types/user';
import { toast } from 'react-toastify';

export const useUsersQuery = () => {
  return useQuery<UserList, Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const useUserByIdQuery = (id: number | undefined) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) => updateUser(id, user),
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: () => {
      toast.success('Đăng ký thành công!');
    },
    onError: () => {
      toast.error('Đăng ký thất bại!');
    },
  });
};
