import { FeedContentsTop } from '@/components/molecules/contents/ContentsTop';
import Feed from '@/components/organisms/Feed';
import useAuth from '@/store/useAuth.store';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // 특정 상태 변경을 구독
    const unsubscribe = useAuth.subscribe(
      (state) => state.userInfo?.id, // 변경될 상태 선택
      (userId) => {
        console.log('홈페이지의 user_id: ' + userId);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  return (
    <div className='flex flex-col gap-[30px]'>
      <FeedContentsTop />
      <Feed />
    </div>
  );
};

export default HomePage;
