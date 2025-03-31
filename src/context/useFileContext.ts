import { createContext, useContext } from 'react';

interface FileContextType {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileContext = createContext<FileContextType | null>(null);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) throw new Error('FileContext is not found');
  return context;
};
