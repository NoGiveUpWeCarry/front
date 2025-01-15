import { tagItem, tagColors } from '@/constants/tagItem';

interface InputDropdownItemProps {
  selectedTag: tagItem[];
  setSelectedTag: (tags: tagItem[]) => void;
}

const InputDropdownItem = ({
  selectedTag,
  setSelectedTag,
}: InputDropdownItemProps) => {
  const selectTag = (tag: tagItem) => {
    if (!selectedTag.includes(tag)) {
      const updatedTags = [...selectedTag, tag];
      setSelectedTag(updatedTags);
    }
  };

  return (
    <ul className='absolute left-0 mt-2 w-fit border bg-white shadow rounded z-50 ml-[20px]'>
      {Object.values(tagItem).map((tag) => (
        <li key={tag} className='px-2 py-1'>
          <div
            className={`flex cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-[3px] ${tagColors[tag]}`}
            onClick={() => selectTag(tag)}
          >
            {tag}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InputDropdownItem;
