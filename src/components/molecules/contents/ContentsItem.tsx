import { HubFooter } from '@/components/molecules/contents/ContentsFooter';
import HubItem from '@/components/molecules/contents/HubItem';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import { roleItemsKey } from '@/constants/hub/roleItems';
import ContentsHubUser from '@/components/molecules/contents/ContentsHubUser';

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  detailRoles: roleTagItemsKey[];
  status: statusTagItemskey;
  role: roleItemsKey;
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
        <ContentsHubUser
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
