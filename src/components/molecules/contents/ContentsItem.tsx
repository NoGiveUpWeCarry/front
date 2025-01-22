// 최종 컨텐츠
import FeedItem from '@/components/molecules/contents/FeedItem';
import {
  FeedFooter,
  HubFooter,
} from '@/components/molecules/contents/ContentsFooter';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import { ContentsFeedTagProps } from '@/types/tags/contentsFeedTag.type';
import { HubTagProps } from '@/types/tags/hubTag.type';
import { RoleProps } from '@/components/atoms/Role';
import { RoleTagProps } from '@/types/tags/roleTag.type';
import { ProjectTagProps } from '@/types/tags/projectTag.type';
import HubItem from '@/components/molecules/contents/HubItem';

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
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
    userId: number;
  };
}

// 허브 컨텐츠
interface HubContentsProps {
  title: string;
  projectTags: { label: string; variant: ProjectTagProps['variant'] }[];
  hubTags: { label: string; variant: HubTagProps['variant'] }[];
  roleTags: { label: string; variant: RoleTagProps['variant'] }[];
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  bookmarkCount: number;
  userCount: number;
  viewsCount: number;
  thumbnail?: string;
  user: {
    avatarSrc: string;
    name: string;
    job: string;
    time: string;
    userId: number;
  };
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
}: FeedContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        avatarSrc={user.avatarSrc}
        name={user.name}
        job={user.job}
        time={user.time}
        userId={user.userId}
      />

      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <FeedItem
              title={title}
              body={body}
              tags={feedTags}
              thumbnail={thumbnail}
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
  projectTags,
  hubTags,
  roleTags,
  role,
  bookmarkCount,
  userCount,
  viewsCount,
  thumbnail,
  user,
  startDate,
  duration,
}: HubContentsProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        avatarSrc={user.avatarSrc}
        name={user.name}
        job={user.job}
        time={user.time}
      />
      <div className='w-full'>
        <div className='bg-white rounded-[10px] p-[20px] w-full'>
          <div className='flex flex-col gap-[20px]'>
            <HubItem
              title={title}
              projectTags={projectTags}
              hubTags={hubTags}
              roleTags={roleTags}
              role={role}
              thumbnail={thumbnail}
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
