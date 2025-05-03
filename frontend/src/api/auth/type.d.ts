type LoginPayload = {
  username: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  expiresIn: string;
};

type UserProfile = {
  id: number;
  username: string;
  name: string;
  registeredAt: string;
};
