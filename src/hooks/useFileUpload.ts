import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

export interface FileUploader {
  fileUrl: string | null;
  file: File | null;
  setFileUrl: (fileUrl: string) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept: InputHTMLAttributes<HTMLInputElement>['accept'];
  unloadFile: () => void;
}

export const useFileUpload = (accept: FileUploader['accept']): FileUploader => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const unloadFile = () => {
    setFileUrl(null);
    setFile(null);
  };

  return {
    fileUrl,
    setFileUrl,
    handleFileChange,
    accept,
    file,
    unloadFile,
  };
};
