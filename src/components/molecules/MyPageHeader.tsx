import Avatar from '@/components/atoms/Avatar';
import FollowButton from '@/components/atoms/FollowButton';
import MessageButton from '@/components/molecules/chat/MessageButton';
import { useGetProfileHeader } from '@/hooks/queries/mypage/introduce';
import { cn } from '@/lib/utils';
import { useMyPageStore } from '@/store/mypageStore';

import { Cog6ToothIcon, LinkIcon } from '@heroicons/react/16/solid';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const MyPageHeader = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  const { ownerId } = useMyPageStore(useShallow((state) => state));
  const { data: headerData } = useGetProfileHeader(ownerId);
  const { isMyPage, setIsMyPage, setRole, setOwnerId } = useMyPageStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    if (userId) {
      setOwnerId(userId);
    }
  }, [location]);

  useEffect(() => {
    if (headerData) {
      setRole(headerData?.role);
      setIsMyPage(!!headerData?.isOwnProfile);
      setOwnerId(headerData?.userId);
    }
  }, [headerData]);

  return (
    <div className='h-[166px] flex items-center gap-7'>
      {headerData?.profileUrl ? (
        <div className='w-[120px] h-[120px] rounded-full'>
          <Avatar size='lg' src={headerData?.profileUrl} alt='profile' />
        </div>
      ) : (
        <div className='w-[120px] h-[120px] rounded-full bg-[#EDEDED] flex justify-center items-center'>
          <Avatar size='lg' src='/src/assets/logos/PAD.svg' alt='profile' />
        </div>
      )}

      <div className='flex-1 flex flex-col gap-5 justify-center relative'>
        <div className='flex items-center gap-[10px] h-[29px]'>
          <h1 className='text-heading2 font-semibold'>
            {headerData?.nickname}
          </h1>
          {!isMyPage && <FollowButton isFollowing />}
        </div>
        <p
          className={cn(
            'text-body1 font-regular line-clamp-2',
            headerData?.introduce ? 'text-black' : 'text-[#838383]'
          )}
        >
          {headerData?.introduce || '한 줄 소개가 없습니다.'}
        </p>
        <div className='flex gap-3 items-center'>
          {headerData?.userLinks.map((link) => (
            <button key={link}>
              <LinkIcon width={20} height={20} />
            </button>
          ))}
        </div>
        <div className='absolute right-0 top-0'>
          {isMyPage ? (
            <Link to='/settings'>
              <Cog6ToothIcon width={24} />
            </Link>
          ) : (
            <MessageButton targetUserId={6} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;
