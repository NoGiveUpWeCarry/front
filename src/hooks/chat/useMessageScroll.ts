import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useRef } from 'react';
import { ReceiveMessage } from '@/types/message.type';

interface UseMessageScrollProps {
  messages: ReceiveMessage[];
  searchMode: boolean;
  onFetchNext: () => void;
  onFetchPrevious: () => void;
}

export const useMessageScroll = ({
  messages,
  searchMode,
  onFetchNext,
}: UseMessageScrollProps) => {
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [direction, setDirection] = useState<'backward' | 'forward'>(
    'backward'
  );

  const { ref: loadNextRef, inView: isTopInView } = useInView();

  useEffect(() => {
    if (isTopInView && !searchMode) {
      onFetchNext();
      setDirection('backward');
    }
  }, [isTopInView]);

  // 스크롤 위치 조정
  // invalidate query를 실행하면 새로운 메시지가 추가되어도 메시지의 개수는 변하지 않아서 스크롤 위치가 변하지 않음
  // fetchNextPage 또는 fetchPreviousPage 시에는 스크롤 위치를 계산해야되고, 자기가 보냈을 때는 무조건 맨 아래로 이동해야됨
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const newHeight = scrollContainer.scrollHeight;
    const heightDiff = newHeight - previousHeightRef.current;
    // searchMode일 경우 MessageBubble 컴포넌트의 scrollIntoView 에 의해 스크롤 위치가 조정됨
    if (!searchMode && heightDiff === 0) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      return;
    }
    if (!searchMode && heightDiff > 0) {
      switch (direction) {
        case 'backward': {
          scrollContainer.scrollTop += heightDiff;
          break;
        }
        case 'forward': {
          scrollContainer.scrollTop -= heightDiff;
          break;
        }
      }
    }
    previousHeightRef.current = newHeight;
  }, [messages, direction, searchMode]);

  return {
    direction,
    loadNextRef,
    scrollContainerRef,
  };
};
