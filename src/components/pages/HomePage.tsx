import Feed from '@/components/organisms/feed/Feed';
import { FeedContentsTop } from '@/components/organisms/feed/FeedContentsTop';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
