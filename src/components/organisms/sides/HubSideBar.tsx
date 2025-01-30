import { useLocation } from 'react-router-dom';
import SideBarTitle from '@/components/atoms/SideBarTitle';
import PadContact from '@/components/molecules/PadContact';
import HubSideBarContents from '@/components/molecules/side/HubSideBarContents';
import HubApplySideBar from '@/components/organisms/sides/HubApplySideBar';
import { useProjectStore } from '@/store/hubDetailStore';
import HubApplyUserSideBar from '@/components/organisms/sides/HubApplyUserSideBar';

const HubSideBar = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const isOwnConnectionHub = useProjectStore(
    (state) => state.isOwnConnectionHub
  );

  const shouldShowHubApplySideBar =
    isOwnConnectionHub === true && location.pathname !== '/projects';

  const shouldShowHubApplyUserSideBar =
    !isOwnConnectionHub === true && location.pathname !== '/projects';

  return (
    <div className='flex flex-col gap-[40px]'>
      {/* Weekly Best Connection Hub */}
      <div className='flex flex-col gap-[10px]'>
        <div className='text-[14px] font-medium text-black'>
          👥 Weekly Best Connection Hub
        </div>
        <HubSideBarContents />
      </div>

      {shouldShowHubApplySideBar && (
        <div className='flex flex-col'>
          <HubApplySideBar />
        </div>
      )}

      {shouldShowHubApplyUserSideBar && (
        <div className='flex flex-col'>
          <HubApplyUserSideBar />
        </div>
      )}

      {/* PAD Contact */}
      <div className='flex flex-col gap-[10px]'>
        <SideBarTitle title='💻 PAD Contact' />
        <PadContact />
      </div>
    </div>
  );
};

export default HubSideBar;
