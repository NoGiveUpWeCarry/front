import Button from '@/components/atoms/Button';
import HorizontalDivider from '@/components/atoms/HorizontalDivider';
import ApplyFormSection from '@/components/organisms/ApplyFormSection/ApplyFormSection';
import {
  useGetResume,
  useMakeResume,
  useUpdateResume,
} from '@/hooks/queries/mypage/apply';
import { useApplyFormStore } from '@/store/applyFormStore';
import useAuthStore from '@/store/authStore';
import { useMyPageStore } from '@/store/mypageStore';
import queryClient from '@/utils/queryClient';
import { FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const ApplyTemplate = () => {
  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));
  const [userInfo] = useAuthStore(useShallow((state) => [state.userInfo]));

  const {
    isEditing,
    setIsEditing,
    applyForm,
    setSingleApplyForm,
    setApplyForm,
    resetApplyForm,
  } = useApplyFormStore(useShallow((state) => state));

  const { data: originResume } = useGetResume(userInfo?.userId!);
  const { mutate: saveResume } = useMakeResume();
  const { mutate: updateResume } = useUpdateResume();

  useEffect(() => {
    if (originResume?.title && originResume?.detail) {
      setApplyForm({
        ...originResume,
        job: originResume.jobDetail,
        link: originResume.portfolioUrl,
      });
    }

    setIsEditing(!originResume?.title);
  }, [originResume]);

  const commonSubmitHandlers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!applyForm.title || !applyForm.detail) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    commonSubmitHandlers(e);

    if (originResume?.title) {
      updateResume(
        {
          resumeData: {
            ...applyForm,
            portfolioUrl: applyForm.link,
          },
          resumeId: applyForm?.resumeId!,
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
      saveResume(
        {
          resumeData: {
            ...applyForm,
            portfolioUrl: applyForm.link,
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
    }
  };

  return (
    <div className='flex flex-col gap-[17px]'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <ApplyFormSection>
            <ApplyFormSection.Input
              name={{
                eng: 'title',
                kor: '제목',
              }}
              value={applyForm.title}
              setValue={(value) => setSingleApplyForm('title', value)}
              required
            />
            <ApplyFormSection.Input
              name={{
                eng: 'link',
                kor: '포트폴리오 링크',
              }}
              value={applyForm.link}
              setValue={(value) => setSingleApplyForm('link', value)}
            />
            <ApplyFormSection.TextArea
              value={applyForm.detail}
              setValue={setSingleApplyForm}
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
              onClick={resetApplyForm}
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
              {originResume?.title ? '수정 저장' : '저장'}
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div className='border border-[#D9D9D9] flex flex-col gap-[10px] rounded-[10px] p-[30px] text-[15px] text-black'>
            <span className='font-light'>
              <strong className='font-medium'>제목: </strong>
              {applyForm.title}
            </span>
            {applyForm.link && (
              <span className='font-light'>
                <strong className='font-medium'>포트폴리오 링크: </strong>
                <Link to={applyForm.link} className='hover:text-blue-600'>
                  {applyForm.link}
                </Link>
              </span>
            )}
            {applyForm.job && (
              <span className='font-light'>
                <strong className='font-medium'>지원 직무: </strong>
                {applyForm.job}
              </span>
            )}
            {applyForm.skills && (
              <span className='font-light'>
                <strong className='font-medium'>기술 스택: </strong>
                {applyForm.skills.join(', ')}
              </span>
            )}
            <HorizontalDivider className='my-5' />
            <span className='font-light'>{applyForm.detail}</span>
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
        </div>
      )}
    </div>
  );
};

export default ApplyTemplate;
