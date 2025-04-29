type Staff = {
  id: number;
  staffName: string;
  dob: string;  // ISO string format
  picture: string;
  address: string;
  lga: string;
  stateOfOrigin: string;
  country: string;
  identity: {
    passportNumber: string;
  };
  email: string;
  phoneNumber: string;
  nextOfKin: {
    name: string;
    relationship: string;
    contact: string;
  };
  references: {
    professional: {
      name: string;
      contact: string;
      relation: string;
    };
  };
  createdBy: number;
  password: string;
  createdAt: string;  // ISO string format
  passwordReset: boolean;
  passwordChangedAt: string;  // ISO string format
  passwordResetString: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  role: Role;
};

interface Customer {
  id: number;         // The unique identifier for the customer
  name: string;         // The name of the customer
  address: string;      // The address of the customer
  country: string;      // The country where the customer is located
  customerType: CustomerType;       // The ID of the customer type (e.g., "Retail", "Wholesale")
}

interface CustomerType {
  id: number;         // The unique identifier for the customer type
  type: string;         // The type of customer (e.g., "Retail", "Wholesale")
}
