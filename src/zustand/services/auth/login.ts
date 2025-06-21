import { LoginTypes } from "@/types/user";
import { post } from "@/utils/Http";

export const loginApi = async (payload: {
    email: string;
    password: string;
}) => {
    const res =await post<LoginTypes>("user/login", payload);        
    return res.data;
};
