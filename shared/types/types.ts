export type Error = {
  statusCode: number;
  error: string;
  messages: { message: string; field?: string }[];
};
