import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { type RoleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { type MeetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { type StatusTagItemskey } from '@/constants/hub/statusTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import { HubFooter } from '@/components/molecules/hub/ContentsFooter';
import HubContentsUser from '@/components/organisms/hub/HubContentsUser';
import HubItem from '@/components/molecules/hub/HubItem';

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: MeetingTagItemskey;
  detailRoles: RoleTagItemsKey[];
  status: StatusTagItemskey;
  role: RoleItemKeys;
  startDate: string;
  duration: string;
  bookMarkCount: number;
  applyCount: number;
  viewCount: number;
  thumbnailUrl?: string;
  createdAt: string;
  projectId: number;
  // 유저
  user: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    role: string;
  };
  hideUser?: boolean;
  isOwnConnectionHub?: boolean;
}

export const HubContents = ({
  title,
  workType,
  status,
  detailRoles,
  hubType,
  role,
  bookMarkCount,
  applyCount,
  viewCount,
  thumbnailUrl,
  user,
  startDate,
  duration,
  hideUser,
  createdAt,
  projectId,
  isOwnConnectionHub,
}: HubContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {!hideUser && (
        <HubContentsUser
          profileUrl={user!.profileUrl}
          nickname={user!.nickname}
          role={user!.role}
          createdAt={createdAt}
          isOwnConnectionHub={isOwnConnectionHub}
          projectId={projectId}
          userId={user.userId}
        />
      )}
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              hubType={hubType!}
              status={status!}
              workType={workType!}
              detailRoles={detailRoles!}
              role={role}
              thumbnailUrl={thumbnailUrl}
              startDate={startDate}
              duration={duration}
              projectId={projectId}
            />

            <HubFooter
              bookMarkCount={bookMarkCount}
              applyCount={applyCount}
              viewCount={viewCount}
              projectId={projectId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
