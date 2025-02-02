import React, { useEffect, useState } from 'react';

interface Message {
  type: string;
  message: string;
  senderNickname: string;
  senderProfileUrl: string;
  timestamp: string;
}

const SSEClient: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_SERVER_URL}/notifications/stream`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      const data: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    eventSource.onerror = (error: Event) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>SSE 알림</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <div>
              <img
                src={message.senderProfileUrl}
                alt={message.senderNickname}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <strong>{message.senderNickname}</strong>
            </div>
            <p>{message.message}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SSEClient;
