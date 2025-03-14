import AccountSection from '@/components/organisms/settings/AccountSection';
import InfoSection from '@/components/organisms/settings/InfoSection';
import NotificationSection from '@/components/organisms/settings/NotificationSection';
import { useGetSettingsInfo } from '@/hooks/queries/mypage/settings';
import { useRef } from 'react';

const SettingsTemplate = () => {
  const viewRef = useRef<HTMLDivElement>(null);

  const { data: settingsInfo } = useGetSettingsInfo();

  return (
    <div
      className='relative w-full h-full mx-auto px-[30px] mt-[-24px] pt-6'
      ref={viewRef}
    >
      <div className='flex flex-col gap-[100px]'>
        <InfoSection settingsInfo={settingsInfo!} />
        <NotificationSection settingsInfo={settingsInfo!} />
        <AccountSection />
      </div>
    </div>
  );
};

export default SettingsTemplate;
