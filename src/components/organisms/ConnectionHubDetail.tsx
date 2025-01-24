import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import { DetailItemType } from '@/mocks/mock-data/detailItem';
import { hubDetailMocks } from '@/mocks/mock-data/hubDetail.mock';
import { useEffect, useState } from 'react';

const ConnectionHubDetail = () => {
  const [data, setData] = useState<DetailItemType[]>([]);
  const { data: HubData } = useFetchHub();
  console.log('Hubdata: ', HubData);

  useEffect(() => {
    setData(hubDetailMocks);
  }, []);

  return (
    <div className='flex p-10px'>
      {data.map((item) => (
        <HubDetail
          title={item.title}
          hubTags={item.hubTags}
          meetingTags={item.meetingTags}
          statusTags={item.statusTags}
          roleTags={item.roleTags}
          skillTags={item.skillTags}
          role={item.role}
          startDate={item.startDate}
          duration={item.duration}
          contents={item.contents}
          user={item.user}
        />
      ))}
    </div>
  );
};

export default ConnectionHubDetail;
