import { FeedContentsTop } from '@/components/molecules/contents/FeedContentsTop';
import Feed from '@/components/organisms/Feed';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
