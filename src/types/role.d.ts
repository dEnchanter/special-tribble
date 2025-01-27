/* eslint-disable @typescript-eslint/no-explicit-any */
type Role = {
  id: string;
  createdDate: string;
  modifiedDate: string;
  groupName: string;
  description: string;
  permissions: any | null;
  createdBy: string | null;
  editable: boolean;
  status: boolean;
  overviewPermissions?: { [category: string]: string[] };
};