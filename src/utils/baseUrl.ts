export const baseURL = (path: string) => {
  return new URL(path, import.meta.env.VITE_LOCAL_URL).toString();
};
