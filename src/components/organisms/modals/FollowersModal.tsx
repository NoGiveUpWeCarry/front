import Avatar from '@/components/atoms/Avatar';
import { ListItem } from '@/components/molecules/ListItem';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useGetFollows } from '@/hooks/queries/mypage/introduce';
import { useTabs } from '@/hooks/useTabs';
import { useMyPageStore } from '@/store/mypageStore';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const FollowersModal = ({
  onClose,
  type,
  isOpen,
}: ModalProps & { type: 'followers' | 'following'; isOpen: boolean }) => {
  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));
  const { tabs, active, setActive } = useTabs(['팔로워', '팔로잉']);

  useEffect(() => {
    setActive(type === 'followers' ? '팔로워' : '팔로잉');
  }, [setActive, type]);

  const { data: followers } = useGetFollows({
    userId: ownerId,
    type: 'followers',
  });
  const { data: followings } = useGetFollows({
    userId: ownerId,
    type: 'following',
  });

  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      width='320px'
      height='460px'
      className='!px-5 !pt-4'
    >
      <div className='w-full'>
        <div className='flex'>
          {tabs.map((item) => (
            <button
              key={item}
              className={`px-2 h-[46px] text-[14px] flex justify-center items-center flex-1 ${active === item ? 'border-b-4 border-b-[#FFBA6C] text-[#FFBA6C]' : 'border-b-4 border-b-[#7D7D7D] text-[#7D7D7D]'}`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className='mt-4'>
          {active === '팔로워'
            ? followers?.followerUsers?.map((user) => (
                <ListItem className='px-[10px] h-12 flex items-center relative'>
                  <ListItem.Col>
                    <Avatar size='xs' src={user?.profileUrl} />
                  </ListItem.Col>
                  <ListItem.Col className='ml-[10px]'>
                    <ListItem.Label className='text-[12px] font-medium'>
                      {user?.nickname}
                    </ListItem.Label>
                  </ListItem.Col>
                  <ListItem.Col className='absolute right-0 top-1/2 transform -translate-y-1/2'>
                    <CursorArrowRaysIcon width={20} />
                  </ListItem.Col>
                </ListItem>
              ))
            : followings?.followerUsers?.map((user) => (
                <ListItem className='px-[10px] h-12 flex items-center relative'>
                  <ListItem.Col>
                    <Avatar size='xs' src={user?.profileUrl} />
                  </ListItem.Col>
                  <ListItem.Col className='ml-[10px]'>
                    <ListItem.Label className='text-[12px] font-medium'>
                      {user?.nickname}
                    </ListItem.Label>
                  </ListItem.Col>
                  <ListItem.Col className='absolute right-0 top-1/2 transform -translate-y-1/2'>
                    <CursorArrowRaysIcon width={20} />
                  </ListItem.Col>
                </ListItem>
              ))}
        </div>
      </div>
    </Modal>
  );
};

export default FollowersModal;
