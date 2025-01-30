import FeedView from '@/components/organisms/search/FeedView';
import ProjectView from '@/components/organisms/search/ProjectView';
import { useSearchTabsStore } from '@/store/searchTabsStore';
import { useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const keyword = query.get('q') as string;

  const { tabs, activeTab, setActiveTab } = useSearchTabsStore(
    useShallow((state) => state)
  );

  if (!keyword) return null;

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex gap-4 items-center text-[25px] font-semibold'>
        <span className='text-[#FFBA6C]'>&ldquo;{keyword}&rdquo;</span>
        <span>검색 결과</span>
      </h1>
      <div className='flex items-center w-full'>
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
        {activeTab === '프로젝트' && <ProjectView keyword={keyword} />}
      </div>
    </div>
  );
};

export default SearchPage;
