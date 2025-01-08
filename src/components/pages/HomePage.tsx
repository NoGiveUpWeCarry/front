import { FeedContentsTop } from '@/components/molecules/contents/ContentsTop';
import Feed from '@/components/organisms/Feed';

function HomePage() {
  return (
    <div className='flex flex-col gap-[30px]'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
}

export default HomePage;
