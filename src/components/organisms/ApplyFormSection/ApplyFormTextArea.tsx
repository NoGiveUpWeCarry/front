import Label from '@/components/atoms/Label';

const ApplyFormTextArea = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (name: string, value: string) => void;
}) => {
  return (
    <>
      <Label text='상세 설명' required />
      <div className='relative'>
        <textarea
          className='w-full h-[398px] bg-white rounded-[10px] border border-[#838383] outline-none resize-none p-5'
          placeholder='자세한 내용을 입력해주세요'
          maxLength={200}
          wrap='hard'
          value={value}
          onChange={(e) => setValue('detail', e.target.value)}
        />
        <span className='absolute bottom-[30px] right-[30px] text-[#838383] p-2 bg-white'>
          {value.length} / 200
        </span>
      </div>
    </>
  );
};

export default ApplyFormTextArea;
