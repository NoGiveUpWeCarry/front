import { SearchState } from '@/store/searchStore';
import axios from 'axios';
import { useMemo } from 'react';

interface Params {
  searchDirection: SearchState['searchDirection'];
  error: Error | null;
  isError: boolean;
}

export const useSearchUpDown = ({
  searchDirection,
  error,
  isError,
}: Params) => {
  const { isFirstMessage, isLastMessage } = useMemo(() => {
    let isFirstMessage = false;
    let isLastMessage = false;
    if (
      isError &&
      axios.isAxiosError(error) &&
      error.response?.status === 404
    ) {
      switch (searchDirection) {
        case 'backward': {
          isFirstMessage = true;
          break;
        }
        case 'forward': {
          isLastMessage = true;
          break;
        }
      }
      alert(error.response.data.message);
    }
    return { isFirstMessage, isLastMessage };
  }, [isError, error]);

  return { isFirstMessage, isLastMessage };
};
