import { RoleProps } from '@/components/atoms/Role';
import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { FeedContents } from '@/components/molecules/contents/FeedContentsItem';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';
import { TagItemKey } from '@/constants/tagItem';
import {
  useSearchConnectionHub,
  useSearchFeed,
} from '@/hooks/queries/search.query';
import { useSearchTabsStore } from '@/store/searchTabsStore';
import { Link, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const keyword = query.get('q') as string;

  const { data: hubs, isLoading: isPostsLoading } =
    useSearchConnectionHub(keyword);
  const { data: feeds, isLoading: isProjectsLoading } = useSearchFeed(keyword);

  const { tabs, activeTab, setActiveTab } = useSearchTabsStore(
    useShallow((state) => state)
  );

  if (!keyword) return null;

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex gap-4 items-center text-[25px] font-semibold'>
        <span className='text-[#FFBA6C]'>&ldquo;{keyword}&rdquo;</span>
        <span>검색 결과</span>
      </h1>
      <div className='flex items-center w-full'>
        <div className='flex'>
          {tabs.map((item) => (
            <button
              key={item}
              className={`px-2 h-[46px] flex justify-center items-center ${activeTab === item ? 'border-b-4 border-b-[#FFBA6C] text-[#FFBA6C]' : 'border-b-4 border-b-[#7D7D7D] text-[#7D7D7D]'}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-5'>
        {activeTab === '피드' &&
          (isPostsLoading ? (
            <div>검색 결과를 가져오는 중 입니다...</div>
          ) : (
            <div className='flex flex-col gap-10'>
              {feeds?.pages[0].posts?.map((post) => (
                <FeedContents
                  key={post.postId}
                  {...post}
                  feedTags={post.tags as TagItemKey[]}
                  thumnailUrl={post.thumbnailUrl}
                  postId={Number(post.postId)}
                  commentsCount={post.commentCount}
                  likesCount={post.likeCount}
                  viewsCount={post.viewCount}
                  user={{
                    avatarSrc: post.userProfileUrl,
                    name: post.userNickname,
                    job: post.userRole,
                    time: post.createdAt,
                  }}
                />
              ))}
            </div>
          ))}
        {activeTab === '프로젝트' &&
          (isProjectsLoading ? (
            <div>검색 결과를 가져오는 중 입니다...</div>
          ) : (
            <div className='flex flex-col gap-10'>
              {hubs?.pages[0].projects?.map((project) => (
                <Link to={`/connectionhub/${project.projectId}`}>
                  <HubContents
                    key={project.projectId}
                    {...project}
                    user={{
                      userProfileUrl: project.userProfileUrl,
                      userNickname: project.userNickname,
                      userRole: project.userRole,
                      createdAt: project.createdAt,
                    }}
                    title={project.title}
                    meetingTags={project.workType as meetingTagItemskey}
                    statusTags={project.status as statusTagItemskey}
                    hubTags={project.hubType as HubTagItemsKey}
                    roleTags={
                      (project.detailRoles ||
                        project.skills) as roleTagItemsKey[]
                    }
                    role={project.role as RoleProps['role']}
                    bookmarkCount={project.bookMarkCount}
                    userCount={project.applyCount}
                    viewsCount={project.viewCount}
                    thumbnailUrl={project.userProfileUrl}
                  />
                </Link>
              ))}
            </div>
          ))}
      </div>

      {/* {active === '피드' &&
       */}
      {/* {active === '프로젝트' && (
        <HubContents
          key={item.title + new Date().toISOString()}
          user={item.user}
          title={item.title}
          meetingTags={item.meetingTags}
          statusTags={item.statusTags}
          hubTags={item.hubTags}
          roleTags={item.roleTags}
          role={item.role}
          bookmarkCount={item.bookmarkCount}
          userCount={item.userCount}
          viewsCount={item.viewsCount}
          thumbnailUrl={item.thumbnailUrl}
          startDate={item.startDate}
          duration={item.duration}
        />
      )} */}
    </div>
  );
};

export default SearchPage;
