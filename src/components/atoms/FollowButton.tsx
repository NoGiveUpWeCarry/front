import Button from '@/components/atoms/Button';
import clsx from 'clsx';

interface IProps {
  isFollowing: boolean;
}

const FollowButton = ({ isFollowing }: IProps) => {
  return (
    <Button
      width='92px'
      height='29px'
      radius='lg'
      variants='filled'
      className={clsx(
        isFollowing ? '!text-[#373A3A]' : 'text-white',
        'text-[15px]'
      )}
      bgColor={isFollowing ? 'bg-lightgray' : 'bg-[#FF7E5F]'}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
