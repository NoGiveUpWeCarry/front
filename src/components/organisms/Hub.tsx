import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { useFetchHubs } from '@/hooks/queries/hub.query';
import { hubMocks } from '@/mocks/mock-data/hub.mock';
import { HubItemType } from '@/mocks/mock-data/hubItem';
import { useEffect, useState } from 'react';

interface HubProps {
  keyword?: string;
}

const Hub = ({ keyword }: HubProps) => {
  const [data, setData] = useState<HubItemType[]>([]);
  const { data: HubsData } = useFetchHubs();
  console.log('Hubsdata: ', HubsData);

  useEffect(() => {
    setData(hubMocks);
  }, []);

  return (
    <div className='flex flex-col gap-[30px] w-full h-full'>
      {data.map((item) => (
        <HubContents
          key={item.title + new Date().toISOString()}
          user={item.user}
          title={item.title}
          meetingTags={item.meetingTags}
          statusTags={item.statusTags}
          hubTags={item.hubTags}
          roleTags={item.roleTags}
          role={item.role}
          bookmarkCount={item.bookmarkCount}
          userCount={item.userCount}
          viewsCount={item.viewsCount}
          thumbnailUrl={item.thumbnailUrl}
          startDate={item.startDate}
          duration={item.duration}
        />
      ))}
      {keyword && !data.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Hub;
