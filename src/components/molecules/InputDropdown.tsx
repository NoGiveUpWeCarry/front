import InputDropdownItem from '@/components/molecules/InputDropdownItem';
import { tagItem, tagColors } from '@/constants/tagItem';
import { useState, useRef, useEffect } from 'react';

const InputDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<tagItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    setOpen(!open);
  };

  const removeTag = (tag: tagItem) => {
    setSelectedTag((prev) => prev.filter((t) => t !== tag));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className='relative px-5 py-1 w-full cursor-pointer border-gray-300 rounded'
    >
      <div
        className='flex flex-wrap gap-2 items-center cursor-text'
        onClick={onClick}
      >
        {selectedTag.length > 0 ? (
          selectedTag.map((tag) => (
            <div
              key={tag}
              className={`flex items-center px-3 py-1 rounded-[5px] text-sm ${tagColors[tag]} `}
            >
              {tag}
              <button
                className='ml-2 text-gray-500 hover:text-gray-700'
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <span className='text-gray'># 태그</span>
        )}
      </div>
      {open && (
        <InputDropdownItem
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      )}
    </div>
  );
};

export default InputDropdown;
