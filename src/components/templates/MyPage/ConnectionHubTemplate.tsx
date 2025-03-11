import DateText from '@/components/atoms/DateText';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useTabs } from '@/hooks/useTabs';
import { useNavigate } from 'react-router-dom';
import { HubResponse } from '@/apis/mypage';
import { showDate } from '@/utils/showDate';
import useConnectionHub from '@/hooks/mypage/useConnectionHub.business';
import { HubFooter } from '@/components/molecules/hub/ContentsFooter';
import HubItem from '@/components/molecules/hub/HubItem';

const TAB_DATA = {
  applied: '지원한 프로젝트',
  created: '내가 작성한 프로젝트',
} as const;

const ConnectionHubTemplate = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const { tabs, active, setActive } = useTabs(Object.values(TAB_DATA));

  const { data, hasNextPage, isFetching, fetchNextPage, error, isLoading } =
    useConnectionHub(active);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col gap-[30px] w-full mt-3'>
      <div className='flex'>
        {tabs.map((item) => (
          <button
            key={item}
            className={`px-2 h-[46px] text-[14px] flex justify-center items-center ${active === item ? 'border-b-4 border-b-[#FFBA6C] text-[#FFBA6C]' : 'border-b-4 border-b-[#7D7D7D] text-[#7D7D7D]'}`}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {data?.pages[0].projects.length === 0 && (
        <div className='flex justify-center text-[13px]'>
          프로젝트가 존재하지 않습니다.
        </div>
      )}
      {isLoading && (
        <div className='flex justify-center text-[13px]'>
          {isLoading && '프로젝트 가져오는 중..'}
          {error && <span className='text-red-500'>에러가 발생했습니다.</span>}
        </div>
      )}
      {data?.pages.map((page: HubResponse) => {
        let lastDate = '';
        return page.projects.map((project) => {
          const [show, date] = showDate(project.createdAt, lastDate);
          lastDate = date as string;
          return (
            <div key={project.title}>
              {show && (
                <DateText
                  hasBg
                  date={project.createdAt}
                  className='mb-[28px]'
                />
              )}
              <div className='w-full'>
                <div
                  className='bg-white rounded-[10px] p-[20px] w-full cursor-pointer'
                  onClick={() => navigate(`/projects/${project.projectPostId}`)}
                >
                  <div className='flex flex-col gap-[20px]'>
                    <HubItem {...project} projectId={project.projectPostId} />
                    <HubFooter
                      {...project}
                      projectId={project.projectPostId}
                      bookMarkCount={project.bookmarkCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        });
      })}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default ConnectionHubTemplate;
