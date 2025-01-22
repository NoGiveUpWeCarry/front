import Icon from '@/components/atoms/Icon';
import { formatDate } from '@/utils/format';
import { useState } from 'react';

interface FeedDetailUserInfoProps {
  userId: number;
  userNickname: string;
  userProfileUrl: string;
  userRole: string;
  title: string;
  createdAt: string;
  isWriter: boolean;
}

const FeedDetailUserInfo = ({
  userNickname,
  userProfileUrl,
  userRole,
  title,
  createdAt,
  isWriter,
}: FeedDetailUserInfoProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className='w-full flex justify-between'>
      <div className='w-fit h-[40px] flex gap-[10px]'>
        <img
          src={userProfileUrl}
          alt='/src/assets/logos/PAD.svg'
          className='w-[40px] h-[40px] rounded-full'
        />
        <div className='flex flex-col justify-between'>
          <div className='flex text-caption1'>
            <p className='font-semibold'>{userNickname}</p>
            <p>님의 &nbsp;</p>
            <p className='font-semibold'>{title}</p>
          </div>
          <div className='text-caption1 flex'>
            <p className='font-semibold'>{userRole}&nbsp;&nbsp;</p>
            <span>&#183;</span>
            <p className='font-semibold'>
              &nbsp;&nbsp;{formatDate(createdAt)}일전
            </p>
          </div>
        </div>
      </div>
      {isWriter && (
        <div className='relative'>
          <div className='cursor-pointer' onClick={() => setClicked(!clicked)}>
            <Icon
              type='EllipsisHorizontalCircle'
              className='w-[24px] h-[24px]'
            />
          </div>
          {clicked && (
            <div className='absolute w-fit h-fit top-[100%] left-0 z-50'>
              <div className='flex flex-col gap-3 text-gray bg-white px-[20px] py-[10px] rounded-[20px] shadow-md'>
                <button className='hover:underline text-caption1 w-[50px] h-fit text-gray flex gap-1'>
                  <Icon
                    type='pencilSquare'
                    className='w-[14px] h-[14px] text-gray'
                  />
                  <p>수정</p>
                </button>
                <button className='hover:underline text-caption1 w-[50px] h-fit text-gray flex gap-1'>
                  <Icon type='trash' className='w-[14px] h-[14px] text-gray' />
                  <p>삭제</p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedDetailUserInfo;
