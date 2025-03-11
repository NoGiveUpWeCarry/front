import AvatarPopup from '@/components/molecules/AvatarPopup';
import DetailContents from '@/components/molecules/hub/DetailContents';
import HubDetailTitle from '@/components/molecules/hub/HubDetailTitle';
import HubDetailUser from '@/components/molecules/hub/HubDetailUser';
import HubInfo from '@/components/molecules/hub/HubInfo';
import HubInfoTag from '@/components/molecules/hub/HubInfoTag';
import HubIntroduce from '@/components/molecules/hub/HubIntroduce';
import HubSkill from '@/components/molecules/hub/HubSkill';
import HubTitle from '@/components/molecules/hub/HubTitle';
import HubDetailFooter from '@/components/molecules/HubDetailFooter';
import HubContentsUser from '@/components/organisms/hub/HubContentsUser';
import { HubTagItemsKey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { RoleItemKeys } from '@/constants/hub/roleItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { skillTagItemsKey } from '@/constants/hub/skillTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface HubDetailProps {
  title: string;
  hubType: HubTagItemsKey;
  workType: meetingTagItemskey;
  status: statusTagItemskey;
  detailRoles: roleTagItemsKey[];
  skills: skillTagItemsKey[];
  role: RoleItemKeys;
  startDate: string;
  duration: string;
  content: string;
  createdAt: string;
  projectId: number;
  bookmarkCount: number;
  applyCount: number;
  viewCount: number;
  manager: {
    userId?: number;
    profileUrl: string;
    nickname: string;
    introduce: string;
    role?: string;
  };
  isOwnConnectionHub: boolean;
}

const HubDetail = ({
  title,
  hubType,
  workType,
  status,
  skills,
  role,
  detailRoles,
  startDate,
  content,
  duration,
  manager,
  createdAt,
  isOwnConnectionHub,
  projectId,
  bookmarkCount,
  applyCount,
  viewCount,
}: HubDetailProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <HubContentsUser
        profileUrl={manager.profileUrl}
        nickname={manager.nickname}
        role={manager.role}
        createdAt={createdAt}
        userId={manager.userId}
        projectId={projectId}
        isOwnConnectionHub={isOwnConnectionHub}
      />

      <div className='flex flex-col w-full bg-white rounded-[20px] p-[20px]'>
        <div className='flex flex-col gap-[20px]'>
          <HubTitle hubType={hubType} title={title} />
          <HubInfoTag workType={workType} status={status} role={role} />
          <HubInfo
            startDate={startDate}
            duration={duration}
            workType={workType}
            role={role}
            detailRoles={detailRoles}
          />
          <HubSkill skills={skills} />

          <div className='flex'>
            <HubDetailTitle title='허브 소개' />
          </div>
          <div>
            <DetailContents content={content} />
          </div>

          {!isOwnConnectionHub && (
            <>
              <div className='flex'>
                <HubDetailTitle title='허브 매니저 소개' />
              </div>
              <div className='flex border rounded-[10px]'>
                <div className='flex w-full mx-[20px] my-[30px]'>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center gap-[20px]'>
                      <AvatarPopup
                        profileUrl={manager.profileUrl}
                        avatarSize='sm'
                        nickname={manager.nickname}
                        userId={manager.userId!}
                        popupClassname='!left-16 top-[-70px]'
                      />
                      <div className='flex'>
                        <HubDetailUser
                          nickname={manager.nickname}
                          introduce={manager.introduce}
                        />
                      </div>
                    </div>
                    <div className='flex'>
                      <HubIntroduce nickname={manager.nickname} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <HubDetailFooter
        bookmarkCount={bookmarkCount}
        applyCount={applyCount}
        viewCount={viewCount}
        projectId={projectId}
      />
    </div>
  );
};

export default HubDetail;
