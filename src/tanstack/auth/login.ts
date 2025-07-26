import { loginApi } from "@/zustand/services/auth/login";
import { useAuthStore } from "@/zustand/store/userAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await loginApi(credentials);
      setTokens({
        token: res.token,
        refreshToken: res.refreshToken,
        expiration: res.expiration,
      });
      return res.user;
    },
    onSuccess: (user) => {
      setUser(user);
      toast.success("Đăng nhập thành công!");
    },
    onError: () => {
      toast.error("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!");
    },
  });
};
