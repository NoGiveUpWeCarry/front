import SearchInput from '@/components/molecules/chat/SearchInput';
import UserList from '@/components/organisms/UserList';

const ChatSidebar = () => {
  return (
    <div>
      <SearchInput />
      <UserList />
    </div>
  );
};

export default ChatSidebar;
