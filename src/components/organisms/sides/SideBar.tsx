import { useLocation } from 'react-router-dom';
import SideBarContents from '@/components/molecules/SideBarContents';
import PadContact from '@/components/molecules/PadContact';
import SideBarTitle from '@/components/atoms/SideBarTitle';

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
          <SideBarContents type='connection' />
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
