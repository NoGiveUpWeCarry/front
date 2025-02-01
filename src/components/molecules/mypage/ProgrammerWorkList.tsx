import WorkList from '@/components/organisms/WorkList';
import { roleItemsKey } from '@/constants/hub/roleItems';
import useIntroduction from '@/hooks/mypage/useIntroduction.business';
import { IntroductionSection } from '@/types/mypage.type';

interface IProps {
  role: roleItemsKey;
  isMusicWorkValid: (work: any) => work is {
    musicUrl: string;
  };
  handleWorks: () => void;
}

const ProgrammerWorkList = ({
  role,
  isMusicWorkValid,
  handleWorks,
}: IProps) => {
  const { profileInfo, isLoading, handleProjectUpdate } = useIntroduction();

  return (
    <WorkList>
      {role === 'Programmer' && (
        <WorkList.Github
          githubId={profileInfo?.githubUsername!}
          loading={isLoading}
        />
      )}
      <WorkList.Projects>
        {(profileInfo as IntroductionSection)?.works?.map((work, i) => {
          if (!isMusicWorkValid(work)) {
            return (
              <WorkList.ProjectItem
                key={`${work.title}-${i}`}
                onClickUpdate={() => handleProjectUpdate(work, handleWorks)}
                {...work}
              />
            );
          }
          return null;
        })}
      </WorkList.Projects>
    </WorkList>
  );
};

export default ProgrammerWorkList;
