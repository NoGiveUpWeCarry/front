import MyPageHeader from '@/components/molecules/MyPageHeader';
import Tabs from '@/components/organisms/Tabs';
import ApplyTemplate from '@/components/templates/MyPage/ApplyTemplate';
import ConnectionHubTemplate from '@/components/templates/MyPage/ConnectionHubTemplate';
import FeedTemplate from '@/components/templates/MyPage/FeedTemplate';
import IntroductionTemplate from '@/components/templates/MyPage/IntroductionTemplate';
import { useTabsStore } from '@/store/tabStore';
import { useShallow } from 'zustand/shallow';

const MyPageTabs = Object.assign({
  소개: IntroductionTemplate,
  지원서: ApplyTemplate,
  피드: FeedTemplate,
  '커넥션 허브': ConnectionHubTemplate,
});

const MyPageTemplate = () => {
  const [activeTab] = useTabsStore(
    useShallow((state) => [state.activeTab])
  ) as [keyof typeof MyPageTabs];

  const ActiveComponent = MyPageTabs[activeTab];

  return (
    <div className='w-full min-h-screen max-w-[1920px] bg-background'>
      <div className='max-w-screen-center h-full mx-auto py-5 px-[30px] flex flex-col gap-[17px]'>
        <MyPageHeader />
        <div className='h-[38px]'>
          <Tabs>
            {Object.keys(MyPageTabs).map((tab, index) => (
              <Tabs.TabItem key={tab} hideDivider={index == 3}>
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
