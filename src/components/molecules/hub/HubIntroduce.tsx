import Button from '@/components/atoms/Button';
import { useFollow } from '@/hooks/queries/follow.query';
import { useGetProfileHeader } from '@/hooks/queries/mypage/introduce';
import { useProjectStore } from '@/store/hubDetailStore';
import { Minus, Plus, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  nickname: string;
}

const HubIntroduce = ({ nickname }: IProps) => {
  const navigate = useNavigate();
  const targetUserId = useProjectStore(
    (state) => state.project?.manager.userId
  );
  const { mutate } = useFollow();
  const {
    data: mangerData,
    refetch,
    isLoading,
  } = useGetProfileHeader(nickname);

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!mangerData) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  const isFollowing = mangerData.isFollowing;
  const userId = mangerData.userId;

  const handleFollow = () => {
    mutate(
      { targetId: userId },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          console.error('팔로우 실패:', error);
        },
      }
    );
  };

  return (
    <div className='flex gap-[10px]'>
      <Button
        width='90px'
        height='40px'
        variants='filled'
        radius='md'
        className='bg-white text-black shadow-xl'
        onClick={handleFollow}
      >
        {isFollowing ? (
          <>
            <Minus className='mr-2 w-5 h-5' /> 팔로잉
          </>
        ) : (
          <>
            <Plus className='mr-2 w-5 h-5' /> 팔로우
          </>
        )}
      </Button>
      <Button
        width='90px'
        height='40px'
        variants='filled'
        radius='md'
        className='bg-gradient-to-b from-[#2E2E2E] to-[#949494] text-white shadow-xl'
        onClick={() => navigate('/chat', { state: { targetUserId } })}
      >
        <Send className='mr-2 w-5 h-5' /> 메세지
      </Button>
    </div>
  );
};

export default HubIntroduce;
