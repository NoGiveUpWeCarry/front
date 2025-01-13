import { ListItem } from '@/components/molecules/ListItem';
import Avatar from '@/components/atoms/Avatar';
import { mainSideBarItems } from '@/mocks/mainSideBar';
import { connectionHubSideBar } from '@/mocks/connectionHubSideBar';
import { cn } from '@/utils/cn';

interface SideBarContentsProps {
  type: 'main' | 'connection';
}

const SideBarContents = ({ type }: SideBarContentsProps) => {
  const items = type === 'main' ? mainSideBarItems : connectionHubSideBar;

  return (
    <div className='flex flex-col bg-white rounded-[10px] py-[20px] px-[20px] gap-[15px]'>
      {items.map((item) => (
        <ListItem key={item.id} className={cn('flex w-full')}>
          {/* 순서 */}
          <ListItem.Col className='mr-3 text-sm justify-start'>
            {item.id}
          </ListItem.Col>

          <ListItem.Col className='mr-4 flex-1 max-w-[230px]'>
            <div className='flex flex-col gap-[10px] w-full'>
              <div className='flex items-center gap-[5px]'>
                <Avatar
                  src='/src/assets/images/example.svg'
                  alt={item.name}
                  size='xxs'
                />
                <ListItem.Label className='font-medium text-[12px]'>
                  {item.name}
                </ListItem.Label>
                <ListItem.Label className='font-medium text-[#838383] text-[12px]'>
                  {item.role}
                </ListItem.Label>
              </div>
              <ListItem.Subtitle className='font-medium text-[14px] truncate w-full'>
                {item.subtitle}
              </ListItem.Subtitle>
            </div>
          </ListItem.Col>
        </ListItem>
      ))}
    </div>
  );
};

export default SideBarContents;
