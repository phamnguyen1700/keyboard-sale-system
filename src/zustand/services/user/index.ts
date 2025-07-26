import { get, post, put, remove } from '@/utils/Http';
import { User, UserList } from '@/types/user';

export const getUsers = async (): Promise<UserList> => {
  const res = await get<UserList>('Users');
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await get<User>(`Users/${id}`);
  return res.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const res = await post<User>('Users', user);
  return res.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const res = await put<User>(`Users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await remove(`Users/${id}`);
};
