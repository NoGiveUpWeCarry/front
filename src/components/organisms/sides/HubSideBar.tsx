import SideBarTitle from '@/components/atoms/SideBarTitle';
import PadContact from '@/components/molecules/PadContact';
import HubSideBarContents from '@/components/molecules/side/HubSideBarContents';

const HubSideBar = () => {
  return (
    <div className='flex flex-col gap-[40px]'>
      <div className='flex flex-col gap-[10px]'>
        <div className='text-[14px] font-medium text-balck'>
          👥 Weekly Best Connection Hub
        </div>
        <HubSideBarContents />
      </div>

      <div className='flex flex-col gap-[10px]'>
        <SideBarTitle title='💻 PAD Contact' />
        <PadContact />
      </div>
    </div>
  );
};

export default HubSideBar;
