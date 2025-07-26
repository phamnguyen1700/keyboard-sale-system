export interface User {
  id: number;
  email: string;
  username: string;
  roles: string[];
}

export type UserList = User[];

export interface LoginTypes {
    token: string;
    expiration: string;
    refreshToken: string;
    user: User;
}
export interface AuthState {
    token: string | null;
    refreshToken: string | null;
    expiration: string | null;
    user: User | null;
    setTokens: (tokens: { token: string; refreshToken: string; expiration: string }) => void;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    clearAuth: () => void;
}
