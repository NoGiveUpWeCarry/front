import AvatarPopup from '@/components/molecules/AvatarPopup';
import FeedContentsUserTitle from '@/components/molecules/contents/FeedContentsUserTitle';

interface ContentsUserProps {
  userProfileUrl: string;
  createdAt: string;
  name: string;
  userRole: string;
  userId?: number;
}

const ContentsUser = ({
  createdAt,
  name,
  userRole,
  userProfileUrl,
  userId,
}: ContentsUserProps) => {
  return (
    <div className='flex items-start space-x-3'>
      <AvatarPopup
        profileUrl={userProfileUrl}
        avatarSize='xs'
        userId={userId!}
        nickname={name}
        popupClassname='top-10'
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
