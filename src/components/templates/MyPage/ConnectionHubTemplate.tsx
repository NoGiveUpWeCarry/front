import DateText from '@/components/atoms/DateText';
import { useMyPageStore } from '@/store/mypageStore';
import { useShallow } from 'zustand/shallow';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useGetConnectionHubs } from '@/hooks/queries/mypage/connection-hub';
import { useTabs } from '@/hooks/useTabs';
import HubItem from '@/components/molecules/contents/HubItem';
import { HubFooter } from '@/components/molecules/contents/ContentsFooter';
import { useNavigate } from 'react-router-dom';

const TAB_DATA = {
  applied: '지원한 프로젝트',
  created: '내가 작성한 프로젝트',
} as const;

const ConnectionHubTemplate = () => {
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const { tabs, active, setActive } = useTabs(Object.values(TAB_DATA));

  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useGetConnectionHubs(
      ownerId,
      active.startsWith('내가') ? 'created' : 'applied'
    );

  const handleTabChange = (item: string) => {
    setActive(item);
  };

  useEffect(() => {
    refetch();
  }, [active]);

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
            onClick={() => handleTabChange(item)}
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
      {data?.pages.map((page) => {
        let lastDate = '';
        return page.projects.map((project) => {
          const currentDate = new Date(project.startDate).toLocaleDateString();
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;
          return (
            <div key={project.title}>
              {showDate && (
                <DateText
                  hasBg
                  date={project.startDate}
                  className='mb-[28px]'
                />
              )}
              <div className='w-full'>
                <div
                  className='bg-white rounded-[10px] p-[20px] w-full cursor-pointer'
                  onClick={() => navigate(`/projects/${project.projectPostId}`)}
                >
                  <div className='flex flex-col gap-[20px]'>
                    <HubItem {...project} />

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
