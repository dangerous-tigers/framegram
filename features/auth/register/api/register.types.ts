export type RegisterRequest = {
  email: string;
  userName: string;
  password: string;
  baseUrl: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  username: string;
  baseUrl: string;
};
