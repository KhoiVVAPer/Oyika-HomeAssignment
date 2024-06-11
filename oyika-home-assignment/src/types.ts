export type User = {
  title: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: {
    country: string;
    city: string;
    street_name: string;
    street_address: string;
  };
  is_active: boolean;
  id: number;
};
