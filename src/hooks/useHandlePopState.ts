import { useEffect } from 'react';

const useHandlePopState = (
  keyword: string,
  openModal: () => void,
  setKeyword: (value: string) => void
) => {
  const fromValue = new URLSearchParams(window.location.search).get('from');

  useEffect(() => {
    if (!fromValue) return;

    const handlePopState = () => {
      const currentUrl = window.location.href;
      if (fromValue === 'search') {
        const newUrl = currentUrl.includes('?')
          ? `${currentUrl}&q=${keyword}`
          : `${currentUrl}?q=${keyword}`;
        window.history.pushState(null, '', newUrl);
        openModal();
      } else {
        window.history.go(-1);
        setKeyword('');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [keyword, openModal, fromValue]);
};

export default useHandlePopState;
