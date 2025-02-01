import { useEffect, useRef, useState } from 'react';

interface UseScrollParams<T extends any = any> {
  datas: T[];
  totalImageCount?: number;
}

export const useScroll = <T>({
  datas,
  totalImageCount,
}: UseScrollParams<T>) => {
  const previousHeightRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // 스크롤 위치 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const newHeight = scrollContainer.scrollHeight;
    scrollContainer.scrollTop =
      scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
    previousHeightRef.current = scrollContainer.scrollHeight;
  }, [datas]);

  // 이미지 로딩 되고 나서 다시 스크롤 조정
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (imagesLoaded === totalImageCount && scrollContainer) {
      const newHeight = scrollContainer.scrollHeight;
      scrollContainer.scrollTop =
        scrollContainer.scrollTop + (newHeight - previousHeightRef.current);
      previousHeightRef.current = scrollContainer.scrollHeight;
    }
  }, [imagesLoaded, totalImageCount]);

  return { scrollContainerRef, handleImageLoad };
};
