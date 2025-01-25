import { HubFooter } from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { RoleProps } from '@/components/atoms/Role';
import HubItem from '@/components/molecules/contents/HubItem';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  hubTags?: HubTagItemsKey;
  meetingTags?: meetingTagItemskey;
  roleTags?: roleTagItemsKey[];
  statusTags?: statusTagItemskey;
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  thumbnailUrl?: string;
  // 유저
  user?: {
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
  hideUser?: boolean;
}

export const HubContents = ({
  title,
  meetingTags,
  statusTags,
  roleTags,
  hubTags,
  role,
  bookmarkCount,
  userCount,
  viewsCount,
  thumbnailUrl,
  user,
  startDate,
  duration,
  hideUser,
}: HubContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {!hideUser && (
        <ContentsUser
          userProfileUrl={user!.userProfileUrl}
          name={user!.userNickname}
          userRole={user!.userRole}
          createdAt={user!.createdAt}
        />
      )}
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              hubTags={hubTags!}
              statusTags={statusTags!}
              meetingTags={meetingTags!}
              roleTags={roleTags!}
              role={role}
              thumbnailUrl={thumbnailUrl}
              startDate={startDate}
              duration={duration}
            />

            <HubFooter
              bookmarkCount={bookmarkCount}
              userCount={userCount}
              viewsCount={viewsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
