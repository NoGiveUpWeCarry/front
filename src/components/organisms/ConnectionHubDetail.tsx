import HubDetail from '@/components/molecules/contents/HubDetail';
import { useFetchHub } from '@/hooks/queries/hub.query';
import useHandlePopState from '@/hooks/useHandlePopState';
import { DetailItemType } from '@/mocks/mock-data/detailItem';
import { hubDetailMocks } from '@/mocks/mock-data/hubDetail.mock';
import { useSearchModal } from '@/store/modals/searchModalstore';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

const ConnectionHubDetail = () => {
  const [data, setData] = useState<DetailItemType[]>([]);
  const { data: HubData } = useFetchHub();
  console.log('Hubdata: ', HubData);

  useEffect(() => {
    setData(hubDetailMocks);
  }, []);

  // NOTE: 검색 모달 관련 코드
  const { openModal, keyword } = useSearchModal(useShallow((state) => state));
  useHandlePopState(keyword, openModal);

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
