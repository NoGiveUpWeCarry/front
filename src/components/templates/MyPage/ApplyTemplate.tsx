import Button from '@/components/atoms/Button';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import ApplyFormSection from '@/components/organisms/ApplyFormSection/ApplyFormSection';
import { ApplyFormData, useApplyFormStore } from '@/store/applyFormStore';
import { FormEvent } from 'react';
import { useShallow } from 'zustand/shallow';

const formData = {
  title: '제목',
  category: '지원 분야',
  link: '포트폴리오 링크',
  content: '상세 설명',
};

const ApplyTemplate = () => {
  const { isEditing, setIsEditing, inputs, onSetInputs, resetInputs } =
    useApplyFormStore(useShallow((state) => state));

  const commonSubmitHandlers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.title || !inputs.category || !inputs.content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    commonSubmitHandlers(e);

    // ...api
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    commonSubmitHandlers(e);

    // ...api
  };

  return (
    <div className='flex flex-col gap-[17px]'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <ApplyFormSection>
            {Object.entries(formData)
              .slice(0, 3)
              .map(([key, value]) => (
                <ApplyFormSection.Input
                  key={key}
                  name={[key, value]}
                  value={inputs[key as keyof ApplyFormData]}
                  setValue={onSetInputs}
                />
              ))}
            <ApplyFormSection.TextArea
              value={inputs.content}
              setValue={onSetInputs}
            />
          </ApplyFormSection>
          <div className='flex gap-[17px] justify-center my-5'>
            <Button
              type='button'
              width='227px'
              height='36px'
              variants='outline'
              radius='sm'
              className='border border-[#838383]'
              onClick={resetInputs}
            >
              초기화
            </Button>
            <Button
              type='submit'
              width='227px'
              height='36px'
              variants='filled'
              radius='sm'
              className='bg-[#00C859]'
            >
              저장
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className='border border-[#D9D9D9] flex flex-col gap-[10px] rounded-[10px] p-[30px] text-[15px] text-black'>
            {Object.entries(formData)
              .slice(0, 3)
              .map(([key, value]) => (
                <span className='font-light' key={key}>
                  <strong className='font-medium'>{value}: </strong>
                  {inputs[key as keyof ApplyFormData]}
                </span>
              ))}
            <HorizontalDivider className='my-5' />
            <span className='font-light'>{inputs.content}</span>
          </div>
          <div className='flex gap-[17px] justify-center my-5'>
            <Button
              type='submit'
              width='227px'
              height='36px'
              variants='outline'
              radius='sm'
              className='border border-[#838383]'
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplyTemplate;
