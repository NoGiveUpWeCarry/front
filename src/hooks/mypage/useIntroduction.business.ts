import {
  useDeleteMusicWork,
  useGetProfileInfo,
} from '@/hooks/queries/mypage/introduce';
import { useAddProjectFormStore } from '@/store/addProjectFormStore';
import { useMyPageStore } from '@/store/mypageStore';
import { ShortProjects } from '@/types/mypage.type';
import { useShallow } from 'zustand/shallow';

const useIntroduction = () => {
  const [nickname, ownerId] = useMyPageStore(
    useShallow((state) => [state.nickname, state.ownerId])
  );
  const { setProjectForm, resetProjectForm } = useAddProjectFormStore(
    useShallow((state) => state)
  );

  const { data: profileInfo, isLoading } = useGetProfileInfo(ownerId);
  const { mutate: deleteMusic } = useDeleteMusicWork(nickname);

  const handleProjectUpdate = (
    work: ShortProjects,
    updateLogic: () => void
  ) => {
    if (!work) return;
    resetProjectForm();

    setProjectForm({
      ...work,
      id: work.myPageProjectId,
      image: work.projectProfileUrl,
      github: work.links.find((el) => el.type === 'Github')?.url ?? '',
      web: work.links.find((el) => el.type === 'Web')?.url ?? '',
      ios: work.links.find((el) => el.type === 'iOS')?.url ?? '',
      android: work.links.find((el) => el.type === 'Android')?.url ?? '',
    });
    updateLogic();
  };

  return {
    handleProjectUpdate,
    resetProjectForm,
    profileInfo,
    deleteMusic,
    isLoading,
  };
};

export default useIntroduction;
