import { PropsWithChildren } from 'react';
interface ChatBodyProps extends PropsWithChildren {}

const ChatBody = ({ children }: ChatBodyProps) => {
  return children;
};

export default ChatBody;
