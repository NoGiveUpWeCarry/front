import Hub from '@/components/organisms/Hub';
import { HubContentsTop } from '@/components/organisms/hub/HubContentTop';

const ConnectionHubPage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <HubContentsTop />
      <Hub />
    </div>
  );
};

export default ConnectionHubPage;
