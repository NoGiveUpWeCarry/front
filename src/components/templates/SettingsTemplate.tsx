import AccountSection from '@/components/organisms/settings/AccountSection';
import InfoSection from '@/components/organisms/settings/InfoSection';
import NotificationSection from '@/components/organisms/settings/NotificationSection';
import { useGetSettingsInfo } from '@/hooks/queries/mypage/settings';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

const SettingsTemplate = () => {
  const viewRef = useRef<HTMLDivElement>(null);

  const { data: settingsInfo } = useGetSettingsInfo();

  const handleScrollToTop = () => {
    if (viewRef.current) {
      viewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className='relative w-full h-full mx-auto px-[30px] mt-[-24px] pt-6'
      ref={viewRef}
    >
      <button
        className='fixed bottom-[50px] right-[200px] w-10 h-10 bg-white rounded-full shadow-lg flex justify-center items-center'
        onClick={handleScrollToTop}
      >
        <ArrowUpIcon width={24} />
      </button>
      <div className='flex flex-col gap-[100px]'>
        <InfoSection settingsInfo={settingsInfo!} />
        <NotificationSection settingsInfo={settingsInfo!} />
        <AccountSection />
      </div>
    </div>
  );
};

export default SettingsTemplate;
