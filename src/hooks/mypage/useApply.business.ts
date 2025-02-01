import {
  useGetResume,
  useMakeResume,
  useUpdateResume,
} from '@/hooks/queries/mypage/apply';
import { ApplyFormData } from '@/store/applyFormStore';
import { querySuccessHandler } from '@/utils/querySuccessHandler';
import { FormEvent } from 'react';

const useApply = (applyForm: ApplyFormData, ownerId: number) => {
  const { data: originResume } = useGetResume(ownerId!);
  const { mutate: saveResume } = useMakeResume();
  const { mutate: updateResume } = useUpdateResume();

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    commonSubmitHandlers: (e: FormEvent<HTMLFormElement>) => void,
    handleSuccess: () => void
  ) => {
    commonSubmitHandlers(e);
    const data = {
      ...applyForm,
      portfolioUrl: applyForm.link,
    };

    const successHandler = () => {
      querySuccessHandler('get-resume', [ownerId]);
      handleSuccess();
    };

    if (originResume?.title) {
      updateResume(
        {
          resumeData: data,
          resumeId: applyForm?.resumeId!,
        },
        {
          onSuccess: successHandler,
        }
      );
    } else {
      saveResume(
        {
          resumeData: data,
        },
        {
          onSuccess: successHandler,
        }
      );
    }
  };

  return {
    originResume,
    saveResume,
    updateResume,
    submitHandler: handleSubmit,
  };
};

export default useApply;
