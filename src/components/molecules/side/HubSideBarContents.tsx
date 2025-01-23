import Avatar from '@/components/atoms/Avatar';
import { hubTagItemsColors } from '@/constants/hub/hubTagItems';
import { generateHubSideBarList } from '@/mocks/mock-data/hubSideBar.mock';

const HubSideBarContents = () => {
  const HubSideBarItems = generateHubSideBarList(5);

  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'>
      {HubSideBarItems.map((item) => (
        <div key={item.rank} className='flex flex-col w-full gap-[10px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-[10px]'>
              <div className='flex text-[12px]'>{item.rank}</div>
              <Avatar
                src={item.userProfileUrl}
                alt={item.userNickname}
                size='xxs'
              />
              <div className='flex text-[12px] font-medium'>
                {item.userNickname}
              </div>
              <div className='flex text-[12px] font-semibold'>
                {item.userRole}
              </div>
            </div>
            <div className='flex'>
              <div
                className={`${hubTagItemsColors[item.hubTags]} text-white text-[10px] px-[5px] py-[2px] rounded-full`}
              >
                {item.hubTags}
              </div>
            </div>
          </div>
          <div className='ml-4 relative overflow-hidden h-[20px] group text-[14px] font-normal'>
            <div
              className={`absolute whitespace-nowrap transition-transform duration-500 ${
                item.title.length > 40 ? 'group-hover:animate-slide' : ''
              }`}
            >
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HubSideBarContents;
