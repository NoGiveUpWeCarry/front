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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImageCount = messages.filter(
    (message) => message.type === 'image'
  ).length;

  const handleImageLoaded = () => {
    setImagesLoaded((prev) => prev + 1);
  };

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
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    setTimeout(() => {
      const newHeight = scrollContainer.scrollHeight;
      const heightDiff = newHeight - previousHeightRef.current;
      // searchMode일 경우 MessageBubble 컴포넌트의 scrollIntoView 에 의해 스크롤 위치가 조정됨
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
    });
  }, [messages, direction, searchMode]);

  // 이미지 로딩 되고 나서 다시 스크롤 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (imagesLoaded !== totalImageCount || !scrollContainer) return;
    const newHeight = scrollContainer.scrollHeight;
    const heightDiff = newHeight - previousHeightRef.current;

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
  }, [imagesLoaded, totalImageCount]);

  return {
    direction,
    loadNextRef,
    handleImageLoaded,
    scrollContainerRef,
  };
};
