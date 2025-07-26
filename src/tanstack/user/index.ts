import { useQuery, useMutation } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser, registerUser, RegisterPayload, assignRole, AssignRolePayload } from '@/zustand/services/user';
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
    onSuccess: () => {
      toast.success('Cập nhật thành công!');
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật thất bại!');
      console.log("Cập nhật thất bại: ", error)
    },
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
    onError: (error: unknown) => {
      const msg = (error as { response?: { data: string } })?.response?.data;
      if (typeof msg === "string" && msg.includes("Email already registered")) {
        toast.error("Email này đã được đăng ký!");
      } else {
        toast.error("Đăng ký thất bại!");
      }
    },
  });
};

export const useAssignRoleMutation = () => {
  return useMutation({
    mutationFn: (payload: AssignRolePayload) => assignRole(payload),
    onSuccess: () => {
      toast.success('Phân quyền thành công!');
    },
    onError: (error: unknown) => {
      toast.error('Phân quyền thất bại!');
      console.log("Phân quyền thất bại: ", error)
    },
  });
};
