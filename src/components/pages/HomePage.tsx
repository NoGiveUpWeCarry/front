import Feed from '@/components/organisms/feed/Feed';
import { FeedContentsTop } from '@/components/organisms/feed/FeedContentsTop';

const HomePage = () => {
  return (
    <div className='flex flex-col lg:gap-[30px] gap-3'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
