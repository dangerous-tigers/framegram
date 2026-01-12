export type AuthFieldError = {
  message: string;
  field: string;
};

export type AuthErrorResponse = {
  statusCode: number;
  messages: AuthFieldError[];
  error: string;
};
