/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserData {
  email: string;
  phoneNumber: string;
  staffName: string;
}

export const saveAccessToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAccessToken = (): void => {
  localStorage.removeItem('token');
};

export const saveUserData = (response: { data: any }): void => {
  const { email, phoneNumber, staffName } = response.data;

  const userData: UserData = { email, phoneNumber, staffName };

  localStorage.setItem("user", JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) as UserData : null;
};

export const clearUserData = (): void => {
  localStorage.removeItem('user');
};

export const saveUserRoleDetail = (role: Role): void => {
  const userRoleDetailString = JSON.stringify(role);
  localStorage.setItem('userRole', userRoleDetailString);
};

export const getUserRoleDetail = (): Role | null => {
  // This checks to ensure code runs only in a client-side environment
  if (typeof window === 'undefined') {
    return null;
  }

  const userRoleString = localStorage.getItem('userRole');
  if (userRoleString) {
    try {
      const userRoleData: Role = JSON.parse(userRoleString);
      return userRoleData;
    } catch (error) {
      console.error("Error parsing user role from local storage:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const clearUserRoleDetail = (): void => {
  localStorage.removeItem('userRole');
};
