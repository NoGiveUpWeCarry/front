import { FeedContentsTop } from '@/components/molecules/contents/ContentsTop';
import Feed from '@/components/organisms/Feed';
import useAuth from '@/store/useAuth.store';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const userId = useAuth.getState().userInfo?.id;
    console.log('user_id: ' + userId);
  }, [useAuth.getState().userInfo?.id]);
  return (
    <div className='flex flex-col gap-[30px]'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
