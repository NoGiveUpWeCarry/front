import FeedView from '@/components/organisms/search/FeedView';
import ProjectView from '@/components/organisms/search/ProjectView';
import useAuthStore from '@/store/authStore';
import { useSearchModal } from '@/store/modals/searchModalstore';
import { useSearchTabsStore } from '@/store/searchTabsStore';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const keyword = query.get('q') as string;

  const { isLoggedIn } = useAuthStore(useShallow((state) => state));
  const { keyword: searchKeyword } = useSearchModal();

  useEffect(() => {
    if (query.get('q')) {
      const handlePopState = () => {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.includes('q=')
          ? currentUrl
          : `${currentUrl}?q=${searchKeyword}`;
        window.history.pushState(
          null,
          '',
          window.innerWidth >= 768 ? newUrl : currentUrl // 탭 이하는 모달 제외
        );
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [location]);

  const { tabs, activeTab, setActiveTab } = useSearchTabsStore(
    useShallow((state) => state)
  );

  if (!keyword) return null;

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex gap-4 items-center text-[25px] font-semibold px-5 md:px-0'>
        <span className='text-[#FFBA6C]'>&ldquo;{keyword}&rdquo;</span>
        <span>검색 결과</span>
      </h1>
      <div className='flex items-center w-full px-5 md:px-0'>
        <div className='flex'>
          {tabs.map((item) => (
            <button
              key={item}
              className={`px-2 h-[46px] flex justify-center items-center ${activeTab === item ? 'border-b-4 border-b-[#FFBA6C] text-[#FFBA6C]' : 'border-b-4 border-b-[#7D7D7D] text-[#7D7D7D]'}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-5'>
        {activeTab === '피드' && <FeedView keyword={keyword} />}
        {activeTab === '프로젝트' && isLoggedIn ? (
          <ProjectView keyword={keyword} />
        ) : (
          <div className='w-full flex justify-center'>
            <Link to='/login' className='hover:text-blue-500'>
              로그인하고 프로젝트보기 👉
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
