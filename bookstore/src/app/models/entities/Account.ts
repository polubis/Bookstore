export interface Account {
  address?: {
    street: string;
    postcode: string;
    city: string;
  };
  email: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  username: string;
}
