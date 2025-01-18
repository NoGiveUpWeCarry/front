import { ListItem } from '@/components/molecules/ListItem';
import Avatar from '@/components/atoms/Avatar';
import { mainSideBarItems } from '@/mocks/mock-data/mainSideBar';
import { connectionHubSideBar } from '@/mocks/mock-data/connectionHubSideBar';
import { cn } from '@/utils/cn';

interface SideBarContentsProps {
  type: 'main' | 'connection';
}

interface SideBarApplicantListProps {
  applicants: { id: number; name: string }[];
}

export const SideBarContents = ({ type }: SideBarContentsProps) => {
  const items = type === 'main' ? mainSideBarItems : connectionHubSideBar;

  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'>
      {items.map((item) => (
        <div
          key={item.id}
          className='flex flex-col w-full text-[12px] gap-[15px]'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-[10px]'>
              <div className='flex text-[14px]'>{item.id}</div>
              <Avatar
                src='/src/assets/images/example.svg'
                alt={item.name}
                size='xxs'
              />
              <div className='flex text-[14px] font-medium'>{item.name}</div>
              <div className='flex text-[12px] font-semibold'>{item.role}</div>
            </div>
            <div className='flex'>
              {item.label && (
                <div
                  className={`flex font-medium text-white text-[10px] px-2 py-1 rounded-full ${
                    item.label === 'OUTSOURCING'
                      ? 'bg-gradient-to-r from-[#FF8800] to-[#84FF74]'
                      : 'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE]'
                  }`}
                >
                  {item.label}
                </div>
              )}
            </div>
          </div>
          <div className='ml-4 relative overflow-hidden h-[20px] group text-[14px] font-medium'>
            <div
              className={`absolute whitespace-nowrap transition-transform duration-500 ${
                item.subtitle.length > 40 ? 'group-hover:animate-slide' : ''
              }`}
            >
              {item.subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SideBarApplicantList = ({
  applicants,
}: SideBarApplicantListProps) => {
  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[30px]'>
      {applicants.map((item) => (
        <ListItem key={item.id} className={cn('flex w-full items-center')}>
          <ListItem.Col className='mr-3 text-sm items-center'>
            {item.id}
          </ListItem.Col>

          <ListItem.Col className='w-full flex-1'>
            <div className='flex items-center gap-[5px] justify-between'>
              <div className='flex items-center gap-[5px]'>
                <Avatar
                  src='/src/assets/images/example.svg'
                  alt={item.name}
                  size='xxs'
                />
                <ListItem.Label className='font-medium text-[12px]'>
                  {item.name}
                </ListItem.Label>
              </div>
              <div className='flex gap-[5px]'>
                <ListItem.Button className='w-[40px] h-[25px] text-[10px] bg-[#00C859] text-white rounded'>
                  수락
                </ListItem.Button>
                <ListItem.Button className='w-[40px] h-[25px] text-[10px] bg-[#FF5E5E] text-white rounded'>
                  거절
                </ListItem.Button>
              </div>
            </div>
          </ListItem.Col>
        </ListItem>
      ))}
    </div>
  );
};
