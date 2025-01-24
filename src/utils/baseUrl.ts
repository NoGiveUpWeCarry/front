export const baseURL = (path: string) => {
  return new URL(path, import.meta.env.VITE_BASE_SERVER_URL).toString();
};
