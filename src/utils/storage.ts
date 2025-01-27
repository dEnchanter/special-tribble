
export const saveAccessToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAccessToken = (): void => {
  localStorage.removeItem('token');
};

export const saveUserData = (user: User): void => {
  const userDataString = JSON.stringify(user);
  localStorage.setItem('user', userDataString);
};

export const getUserData = (): User | null => {
  // This checks to ensure code runs only in a client-side environment
  if (typeof window === 'undefined') {
    return null;
  }

  const userDataString = localStorage.getItem('user');
  if (userDataString) {
    try {
      const userData: User = JSON.parse(userDataString);
      return userData;
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
      return null;
    }
  } else {
    return null;
  }
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
