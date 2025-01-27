import { useEffect } from 'react';

const useHandlePopState = (keyword: string, openModal: () => void) => {
  useEffect(() => {
    const handlePopState = () => {
      const currentUrl = window.location.href;
      if (!currentUrl.includes('q')) {
        const newUrl = currentUrl.includes('?')
          ? `${currentUrl}&q=${keyword}`
          : `${currentUrl}?q=${keyword}`;
        window.history.pushState(null, '', newUrl);
        openModal();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [keyword, openModal]);
};

export default useHandlePopState;
