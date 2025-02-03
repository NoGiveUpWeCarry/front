import Avatar from '@/components/atoms/Avatar';
import { ListItem } from '@/components/molecules/ListItem';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useGetFollows } from '@/hooks/queries/mypage/introduce';
import { useTabs } from '@/hooks/useTabs';
import { useMyPageStore } from '@/store/mypageStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import logoIcon from '@/assets/logos/PAD.svg';

const FollowersModal = ({
  onClose,
  type,
  isOpen,
}: ModalProps & { type: 'followers' | 'following'; isOpen: boolean }) => {
  const navigate = useNavigate();

  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));
  const { tabs, active, setActive } = useTabs(['팔로워', '팔로잉']);

  useEffect(() => {
    setActive(type === 'followers' ? '팔로워' : '팔로잉');
  }, [setActive, type]);

  const { data, refetch } = useGetFollows({
    userId: ownerId,
    type: active === '팔로워' ? 'followers' : 'following',
  });

  useEffect(() => {
    refetch();
  }, [active]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className='!px-5 !pt-4 w-[320px] min-h-[440px]'>
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
        <div className='mt-4 flex flex-col gap-3 h-full overflow-y-scroll'>
          {data?.length! > 0 ? (
            data?.map((user) => (
              <ListItem
                key={user.userId}
                className='px-[10px] h-12 flex items-center relative hover:bg-[#f3f3f3] cursor-pointer rounded-md'
                onClick={() => {
                  onClose();
                  navigate(`/@${user.nickname}`);
                }}
              >
                <ListItem.Col>
                  {user?.profileUrl ? (
                    <Avatar size='xs' src={user?.profileUrl || undefined} />
                  ) : (
                    <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden'>
                      <img src={logoIcon} width={22} />
                    </div>
                  )}
                </ListItem.Col>
                <ListItem.Col className='ml-[10px]'>
                  <ListItem.Label className='text-[14px] font-medium'>
                    {user?.nickname}
                  </ListItem.Label>
                </ListItem.Col>
              </ListItem>
            ))
          ) : (
            <div className='text-[12px] text-gray-600 font-light h-100% flex justify-center items-center'>
              팔로워가 없습니다.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FollowersModal;
