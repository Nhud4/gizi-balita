import * as req from "../../utils/httpRequest";

const endpoint = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  profile: "/api/auth/profile",
};

export const login = async (payload: LoginPayload) => {
  const data = await req.post<ApiResponse<LoginResponse>>(
    endpoint.login,
    payload
  );
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const data = await req.post(endpoint.register, payload);
  return data;
};

export const profile = async () => {
  const data = await req.get<ApiResponse<UserProfile>>(endpoint.profile);
  return data;
};
