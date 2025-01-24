import { ContentsToggle } from '@/components/atoms/contents/ContentsToggle';
import Hub from '@/components/organisms/Hub';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const q = query.get('q') as string;

  const [selectedCategory, setSelectedCategory] = useState('피드');

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='flex gap-4 items-center text-[25px] font-semibold'>
        <span className='text-[#FFBA6C]'>&ldquo;{q}&rdquo;</span>
        <span>검색 결과</span>
      </h1>
      <div className='flex justify-between items-center w-full'>
        <div className='flex'>
          {['피드', '프로젝트', '태그'].map((item) => (
            <button
              key={item}
              className={`px-2 h-[46px] flex justify-center items-center ${selectedCategory === item ? 'border-b-4 border-b-[#FFBA6C] text-[#FFBA6C]' : 'border-b-4 border-b-[#7D7D7D] text-[#7D7D7D]'}`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <ContentsToggle />
      </div>
      {/* {selectedCategory === '피드' && <Feed keyword={q} />} */}
      {selectedCategory === '프로젝트' && <Hub keyword={q} />}
    </div>
  );
};

export default SearchPage;
