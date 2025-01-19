import Button from '@/components/atoms/Button';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import ApplyFormSection from '@/components/organisms/ApplyFormSection/ApplyFormSection';
import {
  useGetResume,
  useMakeResume,
  useUpdateResume,
} from '@/hooks/queries/mypage/apply';
import { ApplyFormData, useApplyFormStore } from '@/store/applyFormStore';
import { useMyPageStore } from '@/store/mypageStore';
import queryClient from '@/utils/queryClient';
import { FormEvent, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const formData = {
  title: '제목',
  link: '포트폴리오 링크',
  job: '지원 직무',
  skills: '스킬',
};

const ApplyTemplate = () => {
  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));

  const { isEditing, setIsEditing, inputs, onSetInputs, resetInputs } =
    useApplyFormStore(useShallow((state) => state));

  const { data: originResume } = useGetResume(ownerId);
  const { mutate: saveResume } = useMakeResume();
  const { mutate: updateResume } = useUpdateResume();

  useEffect(() => {
    if (originResume?.title && originResume?.detail) {
      onSetInputs('title', originResume?.title);
      onSetInputs('detail', originResume?.detail);
      onSetInputs('job', originResume?.jobDetail);
      onSetInputs('portfolioLink', originResume?.portfolioUrl);
      onSetInputs('skills', originResume?.skills);
    }

    setIsEditing(!originResume?.title);
  }, [originResume]);

  const commonSubmitHandlers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.title || !inputs.detail) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    commonSubmitHandlers(e);

    if (originResume?.title) {
      saveResume(
        {
          resumeData: {
            ...inputs,
            portfolioUrl: inputs.portfolioLink,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['get-resume'],
              ownerId,
            });
            setIsEditing(false);
          },
        }
      );
    } else {
      updateResume(
        {
          resumeData: {
            ...inputs,
            portfolioUrl: inputs.portfolioLink,
          },
          resumeId: originResume?.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['get-resume'],
              ownerId,
            });
            setIsEditing(false);
          },
        }
      );
    }
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
              .slice(0, 2)
              .map(([key, value]) => (
                <ApplyFormSection.Input
                  key={key}
                  name={[key, value]}
                  value={inputs[key as keyof ApplyFormData] as string}
                  setValue={onSetInputs}
                  required={key === 'title'}
                />
              ))}
            <ApplyFormSection.TextArea
              value={inputs.detail}
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
            {Object.entries(formData).map(([key, value]) => (
              <span className='font-light' key={key}>
                <strong className='font-medium'>{value}: </strong>
                {inputs[key as keyof ApplyFormData]}
              </span>
            ))}
            <HorizontalDivider className='my-5' />
            <span className='font-light'>{inputs.detail}</span>
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
