import { useFileContext } from '@/context/useFileContext';
import { optimizeImage } from '@/utils/optimizeImage';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useId,
} from 'react';

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    Pick<InputHTMLAttributes<HTMLInputElement>, 'accept' | 'onChange'> {
  children: ReactElement;
}

const FileUploadButton = ({ accept, children, className, onChange }: Props) => {
  const inputId = useId();
  const { setFile } = useFileContext();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.match(/image\/*/)) {
        const optimizedImage = await optimizeImage(file);
        setFile(optimizedImage);
      } else {
        setFile(file);
      }
    }
    if (onChange) onChange(e);
  };

  return (
    <button className={className} type='button'>
      <input
        type='file'
        className='hidden'
        id={inputId}
        accept={accept}
        onChange={handleChange}
      />
      <label htmlFor={inputId} className='cursor-pointer'>
        {children}
      </label>
    </button>
  );
};

export default FileUploadButton;
