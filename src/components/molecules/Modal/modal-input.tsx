import Input from '@/components/atoms/Input';
import useFeedStore from '@/store/postFeedStore';

interface ModalInputProps {
  className?: string;
  placeholder: string;
  message: string;
  error?: boolean;
  value?: string; // 외부에서 값을 받을 수 있도록 추가
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 외부에서 핸들러를 받을 수 있도록 추가
}

const ModalInput = ({
  className = '',
  placeholder,
  message,
  error = false,
  value, // 외부에서 전달된 값을 사용
  onChange, // 외부에서 전달된 핸들러를 사용
}: ModalInputProps) => {
  const title = useFeedStore((state) => state.title);
  const setTitle = useFeedStore((state) => state.setTitle);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); // 외부 핸들러 호출
    } else {
      setTitle(event.target.value); // 내부 상태 업데이트
    }
  };

  return (
    <div className='flex flex-col flex-col w-full items-start w-full gap-[10px]'>
      <Input
        spacing={'none'}
        radius={'none'}
        placeholder={placeholder}
        className={`border-none text-heading1 rounded-md h-[40px] bg-white w-full ${
          error && 'border-red-600'
        } ${className}`}
        value={value ?? title} // 외부 값이 없으면 내부 상태를 사용
        onChange={handleChange}
      />
      {message && <p className='text-[14px] text-red-600 mt-1'>{message}</p>}
    </div>
  );
};

export default ModalInput;
