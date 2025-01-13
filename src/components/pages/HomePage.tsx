import MessageButton from '@/components/molecules/chat/MessageButton';
import { FeedContentsTop } from '@/components/molecules/contents/ContentsTop';
import Feed from '@/components/organisms/Feed';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-[30px]'>
      <MessageButton targetUserId={6} />
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
