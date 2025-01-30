import { SearchState } from '@/store/searchStore';
import { SearchChannelMessagesResponse } from '@/types/message.type';
import { FetcherMessage } from '@/utils/fetcher';
import { useEffect, useState } from 'react';

export const useSearchUpDown = (
  data:
    | (SearchChannelMessagesResponse & {
        message: FetcherMessage;
      })
    | undefined,
  searchDirection: SearchState['searchDirection']
) => {
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.message.code === 404) {
      alert(data.message.text);
      switch (searchDirection) {
        case 'backward':
          setIsFirst(true);
          break;
        case 'forward':
          setIsLast(true);
          break;
      }
    } else {
      setIsFirst(false);
      setIsLast(false);
    }
  }, [data]);

  return { isFirst, isLast };
};
