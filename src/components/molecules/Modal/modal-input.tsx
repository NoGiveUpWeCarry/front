import Input from '@/components/atoms/Input';
import useFeedStore from '@/store/postFeedStore';

interface ModalInputProps {
  className?: string;
  placeholder: string;
  message: string;
}

const ModalInput = ({
  className = '',
  placeholder,
  message,
}: ModalInputProps) => {
  const title = useFeedStore((state) => state.title);
  const setTitle = useFeedStore((state) => state.setTitle);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className='flex flex-col w-full items-start gap-[10px]'>
      <Input
        spacing={'none'}
        radius={'none'}
        placeholder={placeholder}
        className={`border-0 text-heading1 rounded-0 h-[29px] bg-white ${className}`}
        value={title}
        onChange={handleChange}
      />
      <p className='text-[14px] text-red-600'>{message}</p>
    </div>
  );
};

export default ModalInput;
