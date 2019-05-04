export interface LoggedUser {
  isLoggedIn: boolean;
  role: string;
  username: string;
  email: string;
  id: number | string;
  firstName: string;
  lastName: string;
}
