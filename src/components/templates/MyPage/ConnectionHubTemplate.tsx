import DateText from '@/components/atoms/DateText';
import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { useMyPageStore } from '@/store/mypageStore';
import { useShallow } from 'zustand/shallow';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useGetConnectionHubs } from '@/hooks/queries/mypage/connection-hub';
import { useTabs } from '@/hooks/useTabs';
import { ContentsFeedTagVariant } from '@/types/tags/contentsFeedTag.type';
import { ProjectTagVariant } from '@/types/tags/projectTag.type';

const ConnectionHubTemplate = () => {
  const { ref, inView } = useInView();

  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetConnectionHubs(
    ownerId,
    'created'
  );

  const { tabs, active, setActive } = useTabs([
    '지원한 프로젝트',
    '내가 작성한 프로젝트',
  ]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className='flex flex-col gap-[30px] w-full mt-3'>
      {data && data.pages[0].projects.length > 0 ? (
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
      ) : (
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
              <HubContents
                key={project.title + new Date().toISOString()}
                {...project}
                hubTags={[]}
                roleTags={[]}
                role='PROGRAMMER'
                userCount={0}
                bookmarkCount={0}
                projectTags={project.tags.map((el) => ({
                  label: el,
                  variant: el as ProjectTagVariant,
                }))}
                viewsCount={project.view}
                hideUser
              />
            </div>
          );
        });
      })}
      <div ref={ref} className='h-1' />
    </div>
  );
};

export default ConnectionHubTemplate;
