import Avatar from '@/components/atoms/Avatar';
import HubDetailUser from '@/components/atoms/contents/HubDetailUser';
import { RoleProps } from '@/components/atoms/Role';
import ContentsUser from '@/components/molecules/contents/ContentsUser';
import DetailContents from '@/components/molecules/contents/DetailContents';
import HubDetailTitle from '@/components/molecules/contents/HubDetailTitle';
import HubInfo from '@/components/molecules/contents/HubInfo';
import HubInfoTag from '@/components/molecules/contents/HubInfoTag';
import HubIntroduce from '@/components/molecules/contents/HubIntroduce';
import HubSkill from '@/components/molecules/contents/HubSkill';
import HubTitle from '@/components/molecules/contents/HubTitle';
import { hubTagItemskey } from '@/constants/hub/hubTagItems';
import { meetingTagItemskey } from '@/constants/hub/meetingTagItems';
import { roleTagItemsKey } from '@/constants/hub/roleTagsItems';
import { skillTagItemsKey } from '@/constants/hub/skillTagItems';
import { statusTagItemskey } from '@/constants/hub/statusTagItems';

interface HubDetailProps {
  title: string;
  hubTags: hubTagItemskey;
  meetingTags: meetingTagItemskey;
  statusTags: statusTagItemskey;
  roleTags: roleTagItemsKey[];
  skillTags: skillTagItemsKey[];
  role: RoleProps['role'];
  startDate: string;
  duration: string;
  contents: string;
  user: {
    userIntroduce: string;
    userProfileUrl: string;
    userNickname: string;
    userRole: string;
    createdAt: string;
  };
}

const HubDetail = ({
  title,
  hubTags,
  meetingTags,
  statusTags,
  skillTags,
  role,
  roleTags,
  startDate,
  contents,
  duration,
  user,
}: HubDetailProps) => {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      <ContentsUser
        userProfileUrl={user.userProfileUrl}
        userNickname={user.userNickname}
        userRole={user.userRole}
        createdAt={user.createdAt}
      />
      <div className='flex flex-col w-full bg-white rounded-[20px] p-[20px]'>
        <div className='flex flex-col gap-[20px]'>
          <HubTitle hubTags={hubTags} title={title} />
          <HubInfoTag
            meetingTags={meetingTags}
            statusTags={statusTags}
            role={role}
          />
          <HubInfo
            startDate={startDate}
            duration={duration}
            meetingTags={meetingTags}
            role={role}
            roleTags={roleTags}
          />
          <HubSkill skillTags={skillTags} />
          <div className='flex'>
            <HubDetailTitle title='허브 소개' />
          </div>
          <div>
            <DetailContents contents={contents} />
          </div>
          <div className='flex'>
            <HubDetailTitle title='허브 매니저 소개' />
          </div>
          <div className='flex border rounded-[10px]'>
            <div className='flex  w-full mx-[20px] my-[30px]'>
              <div className='flex w-full  items-center  justify-between'>
                <div className='flex items-center gap-[20px]'>
                  <Avatar src={user.userProfileUrl} size='sm' />
                  <div className='flex'>
                    <HubDetailUser
                      userNickname={user.userNickname}
                      userIntroduce={user.userIntroduce}
                    />
                  </div>
                </div>
                <div className='flex'>
                  <HubIntroduce />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail;
