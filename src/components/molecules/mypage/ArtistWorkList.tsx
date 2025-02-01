import WorkList from '@/components/organisms/WorkList';
import useIntroduction from '@/hooks/mypage/useIntroduction.business';
import { IntroductionSection } from '@/types/mypage.type';

const ArtistWorkList = ({
  isMusicWorkValid,
}: {
  isMusicWorkValid: (work: any) => work is {
    musicUrl: string;
  };
}) => {
  const { profileInfo, deleteMusic } = useIntroduction();

  return (
    <WorkList>
      {(profileInfo as IntroductionSection)?.works?.map((work) => {
        if (isMusicWorkValid(work)) {
          if (!['soundcloud', 'spotify'].includes(work.musicUrl)) return null;

          const MusicComponent = work.musicUrl.includes('soundcloud')
            ? WorkList.SoundCloud
            : WorkList.Spotify;

          if (MusicComponent) {
            return (
              <MusicComponent
                url={work.musicUrl}
                onDelete={() => deleteMusic({ workId: work.musicId })}
              />
            );
          }
        }
      })}
    </WorkList>
  );
};

export default ArtistWorkList;
