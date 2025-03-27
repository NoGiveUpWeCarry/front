import HubTemplate from '@/components/templates/HubTemplate';
import { HubContentsTop } from '@/components/organisms/hub/HubContentTop';

const ConnectionHubPage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <HubContentsTop />
      <HubTemplate />
    </div>
  );
};

export default ConnectionHubPage;
