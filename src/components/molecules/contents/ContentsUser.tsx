import Avatar from '@/components/atoms/Avatar';
import FeedContentsUserTitle from '@/components/atoms/contents/FeedContentsUserTitle';

interface ContentsUserProps {
  userProfileUrl: string;
  createdAt: string;
  name: string;
  userRole: string;
}

const ContentsUser = ({
  createdAt,
  name,
  userRole,
  userProfileUrl,
}: ContentsUserProps) => {
  return (
    <div className='flex items-start space-x-3'>
      <Avatar
        src={userProfileUrl}
        size='xs'
        alt={`${name} Avatar`}
        className='object-cover'
      />
      <FeedContentsUserTitle
        userNickname={name}
        userRole={userRole}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ContentsUser;
