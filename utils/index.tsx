/**
 * @File <Required Utility function in Common>
 */

// Required URLs
export const urls = {
  admin: "/admin",
  dashboard: "/",
  login: "/login",
};

export const api = async (AxiosObj: object) => {
  try {
    const data = await AxiosObj;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
