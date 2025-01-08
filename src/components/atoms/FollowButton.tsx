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
        isFollowing
          ? '!text-[#373A3A] bg-lightgray'
          : 'text-white bg-[#FF7E5F]',
        'text-[15px]'
      )}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
