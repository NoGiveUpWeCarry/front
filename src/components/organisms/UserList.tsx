import { ListItem } from '@/components/molecules/ListItem';
import avatar from '@/assets/images/avatar.png';
import Avatar from '@/components/atoms/Avatar';
import Title from '@/components/atoms/Title';
import clsx from 'clsx';

const chatRooms = [
  {
    id: 1,
    avatar: avatar,
    title: '이재혁dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
  {
    id: 2,
    avatar: avatar,
    title: '이재혁',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
  {
    id: 3,
    avatar: avatar,
    title: '이재혁',
    subtitle: '이재혁, 이찬, 한태동',
    lastTime: '1h',
  },
];

const UserList = () => {
  return (
    <ul className='grow flex flex-col gap-[24px]'>
      {chatRooms.map((room) => (
        <li key={room.id}>
          <ListItem className='hover:bg-[#EDECF3] h-[62px] rounded-[8px] cursor-pointer items-center p-[10px]'>
            <ListItem.Col className='w-[44px] h-[44px] shrink-0'>
              <Avatar src={room.avatar} className='w-[44px] h-[44px]' />
            </ListItem.Col>
            <ListItem.Col className='w-[calc(100% - 44px)] flex-auto p'>
              <div className='flex justify-between'>
                <Title size='xs' fontWeight='medium' lineClamp={1}>
                  {room.title}
                </Title>
                <ListItem.Label
                  className={clsx('text-caption1', 'text-mediumgray')}
                >
                  {room.lastTime}
                </ListItem.Label>
              </div>
              <ListItem.Subtitle
                className={clsx('text-caption1', 'text-mediumgray')}
              >
                {room.subtitle}
              </ListItem.Subtitle>
            </ListItem.Col>
          </ListItem>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
