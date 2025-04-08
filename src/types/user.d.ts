type User = {
  id: string;
  createdDate: string;
  modifiedDate: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  address: string;
  email: string;
  phoneNumber: string;
  role: Role;
  active: boolean;
  noOfTries: number;
  onboarded: boolean;
  phoneNumber: string;
  role: Role;
};

type Staff = {
  code: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
}