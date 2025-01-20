import MyPageHeader from '@/components/molecules/MyPageHeader';
import Tabs from '@/components/organisms/Tabs';
import ApplyTemplate from '@/components/templates/MyPage/ApplyTemplate';
import ConnectionHubTemplate from '@/components/templates/MyPage/ConnectionHubTemplate';
import FeedTemplate from '@/components/templates/MyPage/FeedTemplate';
import IntroductionTemplate from '@/components/templates/MyPage/IntroductionTemplate';
import { useMyPageTabsStore } from '@/store/myTabsStore';
import { useShallow } from 'zustand/shallow';

const MyPageTabs = Object.assign({
  소개: IntroductionTemplate,
  지원서: ApplyTemplate,
  피드: FeedTemplate,
  '커넥션 허브': ConnectionHubTemplate,
});

const MyPageTemplate = () => {
  const [activeTab, setActiveTab] = useMyPageTabsStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  const currentTab = activeTab as keyof typeof MyPageTabs;
  const ActiveComponent = MyPageTabs[currentTab];

  return (
    <div className='w-full min-h-screen max-w-[1920px] bg-background'>
      <div className='max-w-screen-center h-full mx-auto flex flex-col gap-[17px]'>
        <MyPageHeader />
        <div className='h-[38px]'>
          <Tabs>
            {Object.keys(MyPageTabs).map((tab, index) => (
              <Tabs.TabItem
                key={tab}
                hideDivider={index == 3}
                onClick={() => setActiveTab(tab)}
                isActive={activeTab === tab}
              >
                {tab}
              </Tabs.TabItem>
            ))}
          </Tabs>
        </div>
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};

export default MyPageTemplate;
