import avatar from '@/assets/images/avatar.png';
import GroupChannel from '@/components/organisms/chat/GroupChannel';
import PersonalChannel from '@/components/organisms/chat/PersonalChannel';
import TerminatedChannel from '@/components/organisms/chat/TerminatedChannel';
import { Channel } from '@/types/chat.type';

const channels: Channel[] = [
  {
    id: 1,
    roomThumbnailURL: avatar,
    title: '최종 프로젝트 1팀 - PAD',
    people: ['이재혁', '이찬', '한태동'],
    lastTime: '1h',
    selected: true,
  },
  {
    id: 2,
    title: 'leechan',
    people: ['이재혁', '이찬'],
    lastTime: '2h',
    selected: false,
  },
  {
    id: 3,
    roomThumbnailURL: avatar,
    title: '이재혁',
    people: [],
    lastTime: '1h',
    selected: false,
  },
  {
    id: 4,
    roomThumbnailURL: avatar,
    title: '최종 프로젝트 1팀 - PAD',
    people: ['이재혁', '이찬', '한태동'],
    lastTime: '1h',
    selected: false,
  },
];

const UserList = () => {
  return (
    <ul className='grow flex flex-col gap-[24px]'>
      {channels.map((channel) => (
        <li key={channel.id}>
          {channel.people.length > 2 && <GroupChannel channel={channel} />}
          {channel.people.length === 2 && <PersonalChannel channel={channel} />}
          {channel.people.length === 0 && (
            <TerminatedChannel channel={channel} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
