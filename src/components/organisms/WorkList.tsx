import Input from '@/components/atoms/Input';
import MyPageProjectCard from '@/components/molecules/MyPageProjectCard';
import { useUpdateGithubNickname } from '@/hooks/queries/mypage/introduce';
import { useMyPageStore } from '@/store/mypageStore';
import { ShortProjects } from '@/types/mypage.type';
import queryClient from '@/utils/queryClient';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const WorkList = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col gap-[17px] w-full'>{children}</div>;
};

WorkList.Github = function Github({
  githubId,
  loading,
}: {
  githubId: string;
  loading: boolean;
}) {
  const [ownerId, isMyPage] = useMyPageStore(
    useShallow((state) => [state.ownerId, state.isMyPage])
  );

  const [originId, setOriginId] = useState(githubId);
  const [value, setValue] = useState('');
  const [changeGithubId, setChangeGithubId] = useState(false);

  const { mutate } = useUpdateGithubNickname();

  const handleMutation = () => {
    mutate(
      { githubUsername: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['profile-info', ownerId],
          });
          setOriginId(value);
          setValue('');
          setChangeGithubId(false);
        },
      }
    );
  };

  return changeGithubId ? (
    <div className='flex flex-col items-center justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4 h-[158px]'>
      <span className='text-[15px] font-medium text-[#838383]'>
        깃허브 계정을 연결해주세요
      </span>
      <Input
        placeholder='깃허브 아이디 입력'
        className='w-[164px] mt-3'
        bgColor='transparent'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleMutation();
          }
        }}
      />
    </div>
  ) : (
    <>
      {isMyPage && (
        <button
          className='flex flex-row items-center justify-end mb-[-10px] text-[12px]'
          onClick={() => setChangeGithubId(true)}
        >
          깃허브 아이디 변경하기 <ChevronRightIcon width={12} />
        </button>
      )}
      <Link
        to={`https://github.com/${githubId}`}
        className='flex justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4 relative'
      >
        <GitHubCalendar
          username={originId}
          blockSize={9.4}
          fontSize={11}
          showWeekdayLabels
          blockMargin={3.2}
          loading={loading}
        />
      </Link>
    </>
  );
};

WorkList.SoundCloud = function SoundCloud({
  url,
  onDelete,
}: {
  url: string;
  onDelete: () => void;
}) {
  const slicedUrl = url.split('?')[0];

  return (
    <>
      <iframe
        width='100%'
        height='130'
        allow='autoplay'
        src={`https://w.soundcloud.com/player/?url=${slicedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      />
      <div className='w-full flex justify-end'>
        <button
          className='flex items-center text-[13px] text-[#838383] mt-[-10px]'
          onClick={onDelete}
        >
          <span>음악 삭제하기</span>
          <XMarkIcon width={12} />
        </button>
      </div>
    </>
  );
};

WorkList.Projects = function Projects({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-2 gap-5'>{children}</div>;
};

WorkList.ProjectItem = function ProjectItem({
  onClickUpdate,
  ...work
}: ShortProjects & { onClickUpdate: () => void }) {
  return <MyPageProjectCard {...work} onClickUpdate={onClickUpdate} />;
};

WorkList.Spotify = function Spotify({
  url,
  onDelete,
}: {
  url: string;
  onDelete: () => void;
}) {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const embedUrl = url.replace(/(\/playlist|\/track|\/artist)/, '/embed$1');
    setIframeUrl(embedUrl);
  }, [url]);

  return (
    <>
      <iframe
        src={iframeUrl}
        width='100%'
        height='80'
        style={{ padding: '0 0' }}
        className=''
      />
      <div className='w-full justify-end'>
        <button className='text-[13px] text-[#838383]' onClick={onDelete}>
          삭제하기 <XMarkIcon width={12} />
        </button>
      </div>
    </>
  );
};

export default WorkList;
