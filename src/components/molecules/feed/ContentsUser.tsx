import AvatarPopup from '@/components/molecules/AvatarPopup';
import FeedContentsUserTitle from '@/components/molecules/contents/FeedContentsUserTitle';

interface ContentsUserProps {
  userProfileUrl: string;
  createdAt: string;
  name: string;
  userRole: string;
  userId?: number;
  hideRole?: boolean;
}

const ContentsUser = ({
  createdAt,
  name,
  userRole,
  userProfileUrl,
  userId,
  hideRole,
}: ContentsUserProps) => {
  return (
    <div className='flex items-center sm:mb-1 px-0 sm:px-0 gap-2'>
      <AvatarPopup
        profileUrl={userProfileUrl}
        avatarSize='gg'
        userId={userId!}
        nickname={name}
        popupClassname='top-8'
      />
      <FeedContentsUserTitle
        userNickname={name}
        userRole={userRole}
        createdAt={createdAt}
        hideRole={hideRole}
      />
    </div>
  );
};

export default ContentsUser;
