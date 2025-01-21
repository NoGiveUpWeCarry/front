import Avatar from '@/components/atoms/Avatar';
import ContentsUserTitle from '@/components/atoms/contents/ConentsUserTitle';

interface ContentsUserProps {
  userProfileUrl: string;
  userNickname: string;
  userRole: string;
  createdAt: string;
}

const ContentsUser = ({
  userProfileUrl,
  userNickname,
  userRole,
  createdAt,
}: ContentsUserProps) => {
  return (
    <div className='flex items-start space-x-3'>
      <Avatar src={userProfileUrl} size='xs' alt={`${userNickname} Avatar`} />
      <ContentsUserTitle
        userNickname={userNickname}
        userRole={userRole}
        createdAt={createdAt}
      />
    </div>
  );
};

export default ContentsUser;
