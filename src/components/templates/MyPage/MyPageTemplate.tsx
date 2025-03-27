import VerticalDivider from '@/components/atoms/VerticalDivider';
import MyPageHeader from '@/components/molecules/MyPageHeader';
import Tabs from '@/components/organisms/Tabs';
import ApplyTemplate from '@/components/templates/MyPage/ApplyTemplate';
import ConnectionHubTemplate from '@/components/templates/MyPage/ConnectionHubTemplate';
import FeedTemplate from '@/components/templates/MyPage/FeedTemplate';
import IntroductionTemplate from '@/components/templates/MyPage/IntroductionTemplate';
import { useWindowSize } from '@/hooks/useWindowSize';

const MyPageTemplate = () => {
  const { width } = useWindowSize();

  const tabs = [
    {
      name: '소개',
      component: <IntroductionTemplate />,
    },
    {
      name: '지원서',
      component: <ApplyTemplate />,
    },
    {
      name: '피드',
      component: <FeedTemplate />,
    },
    {
      name: width <= 410 ? '허브' : '커넥션 허브',
      component: <ConnectionHubTemplate />,
    },
  ];

  return (
    <div className='w-full min-h-screen max-w-[1920px] bg-background lg:px-0 px-4'>
      <div className='max-w-screen-center h-full mx-auto flex flex-col gap-[17px]'>
        <MyPageHeader />
        <Tabs>
          <Tabs.Triggers
            labels={tabs.map((tab) => tab.name)}
            className='w-full h-[38px] px-[5px] flex items-center bg-[#d1d1d1] rounded-[5px]'
            divider={<VerticalDivider />}
          />
          <Tabs.Pannels components={tabs.map((tab) => tab.component)} />
        </Tabs>
      </div>
    </div>
  );
};

export default MyPageTemplate;
