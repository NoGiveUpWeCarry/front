import { ChangeEvent, cloneElement, ReactElement, useId } from 'react';

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  className?: string;
  children: ReactElement<HTMLLabelElement>;
}

const FileUploadButton = ({ onChange, accept, children, className }: Props) => {
  const inputId = useId();
  const cloneChildren = cloneElement(children, { htmlFor: inputId });
  return (
    <div className={className}>
      <input
        type='file'
        className='hidden'
        id={inputId}
        accept={accept}
        onChange={onChange}
      />
      {cloneChildren}
    </div>
  );
};

export default FileUploadButton;
