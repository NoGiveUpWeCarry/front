import ConnectionHubDetail from '@/components/organisms/ConnectionHubDetail';
import { useParams } from 'react-router-dom';

const ConnetcionHubDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className='flex w-full flex-col gap-[20px]'>
      <ConnectionHubDetail key={projectId} />
    </div>
  );
};

export default ConnetcionHubDetailPage;
