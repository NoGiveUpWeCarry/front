import MyPageHeader from '@/components/molecules/MyPageHeader';
import Tabs from '@/components/organisms/Tabs';
import ApplyTemplate from '@/components/templates/MyPage/ApplyTemplate';
import ConnectionHubTemplate from '@/components/templates/MyPage/ConnectionHubTemplate';
import FeedTemplate from '@/components/templates/MyPage/FeedTemplate';
import IntroductionTemplate from '@/components/templates/MyPage/IntroductionTemplate';
import { useApplyFormStore } from '@/store/applyFormStore';
import { useMyPageTabsStore } from '@/store/myTabsStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

const MyPageTabs = Object.assign({
  소개: IntroductionTemplate,
  지원서: ApplyTemplate,
  피드: FeedTemplate,
  '커넥션 허브': ConnectionHubTemplate,
});

const MyPageTemplate = () => {
  const { activeTab, setActiveTab } = useMyPageTabsStore(
    useShallow((state) => state)
  );

  const currentTab = activeTab as keyof typeof MyPageTabs;
  const ActiveComponent = MyPageTabs[currentTab];

  const { resetApplyForm } = useApplyFormStore(useShallow((state) => state));

  useEffect(() => {
    return () => {
      resetApplyForm();
      setActiveTab('소개');
    };
  }, [resetApplyForm]);

  return (
    <div className='w-full min-h-screen max-w-[1920px] bg-background lg:px-0 px-4'>
      <div className='max-w-screen-center h-full mx-auto flex flex-col gap-[17px]'>
        <MyPageHeader />
        <div className='h-[38px]'>
          <Tabs>
            {Object.keys(MyPageTabs).map((tab, index) => {
              console.log(window.innerWidth);
              const displayTab =
                tab === '커넥션 허브' && window.innerWidth <= 410
                  ? '허브'
                  : tab;
              return (
                <Tabs.TabItem
                  key={tab}
                  hideDivider={index == 3}
                  onClick={() => setActiveTab(tab)}
                  isActive={activeTab === tab}
                >
                  {displayTab}
                </Tabs.TabItem>
              );
            })}
          </Tabs>
        </div>
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};

export default MyPageTemplate;
