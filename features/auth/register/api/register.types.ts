export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  username: string;
  baseUrl: string;
};
