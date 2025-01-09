import { HubContentsTop } from '@/components/molecules/contents/ContentsTop';
import Hub from '@/components/organisms/Hub';

const ConnectionHubPage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <HubContentsTop />
      <Hub />
    </div>
  );
};

export default ConnectionHubPage;
