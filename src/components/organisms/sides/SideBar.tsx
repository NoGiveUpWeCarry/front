import { useLocation } from 'react-router-dom';
import {
  SideBarApplicantList,
  SideBarContents,
} from '@/components/molecules/side/SideBarContents';
import PadContact from '@/components/molecules/PadContact';
import SideBarTitle from '@/components/atoms/SideBarTitle';
import { ProjectApplyButton } from '@/components/molecules/contents/HubApplyButton';
import { applicantList } from '@/mocks/mock-data/applicantList.mock';

const SideBar = () => {
  const location = useLocation();

  return (
    <div className='flex flex-col gap-[40px]'>
      {location.pathname === '/' && (
        <div className='flex flex-col gap-[10px]'>
          <SideBarTitle title='🔥 Best Contents' />
          <SideBarContents type='main' />
        </div>
      )}

      {location.pathname === '/connectionhub' && (
        <div className='flex flex-col gap-[10px]'>
          <SideBarTitle title='👥 Best Connection Hub' />
          <SideBarContents type='connection' />
        </div>
      )}
      {location.pathname === '/connectionhubdetailpage' && (
        <div className='flex flex-col gap-[10px]'>
          <SideBarTitle title='👥 Best Connection Hub' />
          <div className='flex flex-col gap-[20px]'>
            <SideBarContents type='connection' />
            <ProjectApplyButton />
          </div>
          <SideBarTitle title='지원자 목록' />
          <div className='flex flex-col gap-[20px]'>
            <SideBarApplicantList applicants={applicantList} />
          </div>
        </div>
      )}

      <div className='flex flex-col gap-[10px]'>
        <SideBarTitle title='💻 PAD Contact' />
        <PadContact />
      </div>
    </div>
  );
};

export default SideBar;
