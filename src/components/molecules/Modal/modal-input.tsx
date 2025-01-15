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
    <div className={`bg-background flex flex-col gap-[6px]`}>
      <Input
        placeholder={placeholder}
        className={`border-0 px-[20px] text-heading1 rounded-0 h-[29px] bg-background ${className}`}
        value={title}
        onChange={handleChange}
      />
      <p className='text-caption2 text-red-600 px-[20px]'>{message}</p>
    </div>
  );
};

export default ModalInput;
