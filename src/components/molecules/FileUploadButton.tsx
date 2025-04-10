import { LIMIT } from '@/constants/limit';
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

  const handleImageFile = async (file: File) => {
    const optimizedImage = await optimizeImage(file);
    if (optimizedImage.size > LIMIT.MAX_IMAGE_SIZE) {
      alert(
        `이미지 크기가 너무 큽니다. 최대 ${LIMIT.MAX_IMAGE_SIZE / 1e6}MB 까지 업로드 가능합니다.`
      );
      setFile(null);
      return null;
    }
    return optimizedImage;
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    let optimizedImage: File | null = null;
    if (!file) return;

    if (file.type.match(/image\/*/)) {
      optimizedImage = await handleImageFile(file);
    }

    setFile(optimizedImage || file);

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
