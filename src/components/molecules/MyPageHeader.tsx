import Avatar from '@/components/atoms/Avatar';
import FollowButton from '@/components/atoms/FollowButton';
import MessageButton from '@/components/molecules/chat/MessageButton';
import { useGetProfileHeader } from '@/hooks/queries/mypage/introduce';
import { cn } from '@/lib/utils';
import { useMyPageStore } from '@/store/mypageStore';

import { Cog6ToothIcon, LinkIcon } from '@heroicons/react/16/solid';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const LINK_ICONS = {
  github: '/src/assets/icons/github.svg',
  notion: '/src/assets/icons/notion.svg',
  linkedin: '/src/assets/icons/linkedin.svg',
};

const MyPageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.pathname.slice(2);

  const {
    data: headerData,
    isLoading,
    error,
    refetch,
  } = useGetProfileHeader(nickname);
  const { isMyPage, setIsMyPage, setRole, setOwnerId, setNickname } =
    useMyPageStore(useShallow((state) => state));

  useEffect(() => {
    if (
      error instanceof AxiosError &&
      error.response?.data?.statusCode === 404
    ) {
      alert('존재하지 않는 사용자입니다.');
      navigate(-1);
    }
  }, [error]);

  useEffect(() => {
    if (nickname) {
      setNickname(nickname);
    }
  }, [location]);

  useEffect(() => {
    if (headerData?.userId) {
      setOwnerId(headerData?.userId);
    }

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
          <Avatar
            size='lg'
            src={headerData?.profileUrl}
            alt='profile'
            className='object-cover'
          />
        </div>
      ) : (
        <div className='w-[120px] h-[120px] rounded-full bg-[#EDEDED] flex justify-center items-center'>
          <Avatar size='lg' src='/src/assets/logos/PAD.svg' alt='profile' />
        </div>
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex-1 flex flex-col gap-5 justify-center relative'>
          <div className='flex items-center gap-[10px] h-[29px]'>
            <h1 className='text-heading2 font-semibold'>
              {headerData?.nickname}
            </h1>
            {!isMyPage && (
              <FollowButton
                isFollowing={headerData?.isFollowing!}
                nickname={headerData?.nickname!}
                userId={headerData?.userId!}
                onRefetch={refetch}
              />
            )}
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
            {headerData?.userLinks.map((link) => {
              const items = Object.keys(LINK_ICONS).filter((el) =>
                link.includes(el)
              )[0];

              if (items?.length) {
                return (
                  <Link to={link} key={link}>
                    <img
                      src={LINK_ICONS[items as keyof typeof LINK_ICONS]}
                      width={20}
                      height={20}
                    />
                  </Link>
                );
              }
              return (
                <Link to={link} key={link}>
                  <LinkIcon width={20} height={20} />
                </Link>
              );
            })}
          </div>
          <div className='absolute right-0 top-0'>
            {isMyPage ? (
              <Link to='/settings'>
                <Cog6ToothIcon width={24} />
              </Link>
            ) : (
              <MessageButton targetUserId={headerData?.userId!} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageHeader;
