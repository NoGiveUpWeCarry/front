import { RefObject, useEffect } from 'react';

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  handler: () => void;
  eventType: 'touchstart' | 'mousedown';
}

export const useOutsideClick = ({
  ref,
  handler,
  eventType,
}: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
        console.log('outside');
      }
    };

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, handler, eventType]);
};
