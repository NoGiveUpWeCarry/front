import Input from '@/components/atoms/Input';
import MyPageProjectCard from '@/components/molecules/MyPageProjectCard';
import { ReactNode, useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

const WorkList = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col gap-[17px] w-full'>{children}</div>;
};

WorkList.Github = function () {
  const [githubId, setGithubId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return isSubmitted ? (
    <Link
      to={`https://github.com/${githubId}`}
      className='flex justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4'
    >
      <GitHubCalendar
        username={githubId}
        blockSize={9.4}
        fontSize={11}
        showWeekdayLabels
        blockMargin={3.2}
      />
    </Link>
  ) : (
    <div className='flex flex-col items-center justify-center bg-white border border-[#e1e1e1] rounded-[5px] pb-[10px] pt-4 h-[158px]'>
      <span className='text-[15px] font-medium text-[#838383]'>
        깃허브 계정을 연결해주세요
      </span>
      <Input
        placeholder='깃허브 아이디 입력'
        className='w-[164px] mt-3'
        bgColor='transparent'
        value={githubId}
        onChange={(e) => setGithubId(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsSubmitted(true);
          }
        }}
      />
    </div>
  );
};

WorkList.SoundCloud = function ({ url }: { url: string }) {
  const slicedUrl = url.split('?')[0];

  return (
    <iframe
      width='100%'
      height='130'
      allow='autoplay'
      src={`https://w.soundcloud.com/player/?url=${slicedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
    ></iframe>
  );
};

interface ProjectData {
  url: string;
  platforms: ('android' | 'ios' | 'web')[];
  title: string;
  description: string;
}

WorkList.Projects = function ({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-2 gap-5'>{children}</div>;
};

WorkList.ProjectItem = function (_project: ProjectData) {
  return <MyPageProjectCard />;
};

WorkList.Spotify = function ({ url }: { url: string }) {
  const [iframeUrl, setIframeUrl] = useState('');

  useEffect(() => {
    const embedUrl = url.replace(/(\/playlist|\/track|\/artist)/, '/embed$1');
    setIframeUrl(embedUrl);
  }, [url]);

  return (
    <iframe
      src={iframeUrl}
      width='100%'
      height='80'
      style={{ padding: '0 0' }}
      className=''
    />
  );
};

export default WorkList;
