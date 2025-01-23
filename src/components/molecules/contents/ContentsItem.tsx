// 최종 컨텐츠
import FeedItem from '@/components/molecules/contents/FeedItem';
import {
  FeedFooter,
  HubFooter,
} from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { ContentsFeedTagProps } from '@/types/tags/contentsFeedTag.type';
import { RoleProps } from '@/components/atoms/Role';
import HubItem from '@/components/molecules/contents/HubItem';
import { hubTagItemskey } from '@/constants/hub/hubTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

// 피드 컨텐츠
interface FeedContentsProps {
  title: string;
  body: string;
  feedTags: { label: string; variant: ContentsFeedTagProps['variant'] }[];
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  thumbnail?: string;
  user: {
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
  hideUser?: boolean;
  sliceBody?: boolean;
}

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  hubTags: hubTagItemskey;
  meetingTags: meetingTagItemskey;
  roleTags: roleTagItemsKey[];
  statusTags: statusTagItemskey;
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  thumbnailUrl?: string;
  // 유저
  user: {
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
  hideUser: boolean;
}

export const FeedContents = ({
  title,
  body,
  feedTags,
  commentsCount,
  likesCount,
  viewsCount,
  thumbnail,
  user,
  hideUser,
  sliceBody,
}: FeedContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        userProfileUrl={user.userProfileUrl}
        userNickname={user.userNickname}
        userRole={user.userRole}
        createdAt={user.createdAt}
      />

      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <FeedItem
              title={title}
              body={body}
              tags={feedTags}
              thumbnail={thumbnail}
              sliceBody={sliceBody}
            />
            <FeedFooter
              commentsCount={commentsCount}
              likesCount={likesCount}
              viewsCount={viewsCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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
      <ContentsUser
        userProfileUrl={user.userProfileUrl}
        userNickname={user.userNickname}
        userRole={user.userRole}
        createdAt={user.createdAt}
      />
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              hubTags={hubTags}
              statusTags={statusTags}
              meetingTags={meetingTags}
              roleTags={roleTags}
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
