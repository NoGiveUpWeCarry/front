import Icon from '@/components/atoms/Icon';
import { FileUploader } from '@/hooks/useFileUpload';

interface FilePreviewProps {
  fileUploader: FileUploader;
}

const FilePreview = ({
  fileUploader: { fileUrl, unloadFile },
}: FilePreviewProps) => {
  return (
    <div className='ml-[48px] p-4'>
      {fileUrl && (
        <div className='w-48 h-48 relative'>
          <button
            onClick={unloadFile}
            type='button'
            className='w-4 h-4 bg-darkgray/20 rounded-full absolute top-0 right-0 transform-gpu translate-x-1/2 -translate-y-1/2'
          >
            <Icon type='plus' className='transform rotate-45' />
          </button>
          <img
            src={fileUrl}
            alt='preview'
            className='w-full h-full object-cover rounded-lg shadow'
          />
        </div>
      )}
    </div>
  );
};

export default FilePreview;
