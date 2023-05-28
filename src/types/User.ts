export interface User {
  username: string;
  email: string;
  password: string;
  image?: string;
  token: string | undefined | null;
}
