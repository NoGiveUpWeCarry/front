import { useEffect, useRef, useState } from 'react';

interface UseScrollParams<T extends any = any> {
  datas: T[];
  totalImageCount?: number;
  searchMode: boolean;
  direction: 'forward' | 'backward';
}

export const useScroll = <T>({
  datas,
  totalImageCount,
  searchMode,
  direction,
}: UseScrollParams<T>) => {
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoaded = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const newHeight = scrollContainer.scrollHeight;

    // searchMode일 경우 MessageBubble 컴포넌트의 scrollIntoView 에 의해 스크롤 위치가 조정됨
    // 따라서 이전 스크롤 높이를 초기화 하고 바로 return 시켜줌
    if (!searchMode) {
      switch (direction) {
        case 'backward': {
          scrollContainer.scrollTop += newHeight - previousHeightRef.current;
          break;
        }
        case 'forward': {
          scrollContainer.scrollTop -= newHeight - previousHeightRef.current;
          break;
        }
      }
    }

    previousHeightRef.current = newHeight;
  }, [datas]);

  // 이미지 로딩 되고 나서 다시 스크롤 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (imagesLoaded !== totalImageCount || !scrollContainer) return;

    const newHeight = scrollContainer.scrollHeight;

    if (!searchMode) {
      switch (direction) {
        case 'backward': {
          scrollContainer.scrollTop += newHeight - previousHeightRef.current;
          break;
        }
        case 'forward': {
          scrollContainer.scrollTop -= newHeight - previousHeightRef.current;
          break;
        }
      }
    }

    previousHeightRef.current = newHeight;
  }, [imagesLoaded, totalImageCount]);

  return { scrollContainerRef, handleImageLoaded };
};
