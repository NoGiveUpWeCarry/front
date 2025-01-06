import Button from '@/components/atoms/Button';
import Label from '@/components/atoms/Label';
import InputWithLabel from '@/components/molecules/InputWithLabel';
import { ChangeEvent, useState } from 'react';

interface FormData {
  title: string;
  category: string;
  link: string;
  content: string;
}

const ApplyTemplate = () => {
  const initialInputs = {
    title: '',
    category: '',
    link: '',
    content: '',
  };

  const [inputs, setInputs] = useState<FormData>(initialInputs);

  const handleReset = () => setInputs(initialInputs);

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className='flex flex-col gap-[17px]'>
      <InputWithLabel
        text='제목'
        name='title'
        required
        placeholder='제목을 입력해주세요'
        value={inputs.title}
        setValue={handleSetValue}
      />
      <InputWithLabel
        text='지원 분야'
        name='category'
        required
        placeholder='지원 분야를 입력해주세요'
        value={inputs.category}
        setValue={handleSetValue}
      />
      <InputWithLabel
        text='포트폴리오 링크'
        name='link'
        placeholder='포트폴리오 링크를 입력해주세요'
        value={inputs.link}
        setValue={handleSetValue}
      />
      <Label text='상세 설명' required />
      <div className='relative'>
        <textarea
          className='w-full h-[398px] bg-white rounded-[10px] border border-[#838383] outline-none resize-none p-5'
          placeholder='자세한 내용을 입력해주세요'
          maxLength={200}
          wrap='hard'
          value={inputs.content}
          onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
        />
        <span className='absolute bottom-[30px] right-[30px] text-[#838383] p-2 bg-white'>
          {inputs.content.length} / 200
        </span>
      </div>
      <div className='flex gap-[17px] justify-center mb-5'>
        <Button
          width='227px'
          height='36px'
          variants='outline'
          radius='sm'
          className='border border-[#838383]'
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button
          width='227px'
          height='36px'
          variants='filled'
          radius='sm'
          className='bg-[#00C859]'
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default ApplyTemplate;
