import axios from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

export async function loginApi({ email, password }: LoginRequest) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
    email,
    password,
  });
  return response.data;
}
