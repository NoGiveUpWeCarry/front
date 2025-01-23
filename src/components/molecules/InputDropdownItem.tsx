import { tagItem, tagColors, TagItemKey } from '@/constants/tagItem';
import { tagItem, tagColors, TagItemKey } from '@/constants/tagItem';

interface InputDropdownItemProps {
  selectedTag: TagItemKey[];
  setSelectedTag: (tags: TagItemKey[]) => void;
  selectedTag: TagItemKey[];
  setSelectedTag: (tags: TagItemKey[]) => void;
}

const InputDropdownItem = ({
  selectedTag,
  setSelectedTag,
}: InputDropdownItemProps) => {
  const selectTag = (tag: TagItemKey) => {
  const selectTag = (tag: TagItemKey) => {
    if (!selectedTag.includes(tag)) {
      const updatedTags = [...selectedTag, tag];
      setSelectedTag(updatedTags);
    }
  };

  return (
    <ul className='absolute left-0 mt-2 w-fit border bg-white shadow rounded z-50 ml-[20px]'>
      {Object.keys(tagItem).map((key) => {
        const tagKey = key as TagItemKey;
        const tagValue = tagItem[tagKey];
        return (
          <li key={tagKey} className='px-2 py-1'>
            <div
              className={`flex cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-[3px] ${tagColors[tagKey]}`}
              onClick={() => selectTag(tagKey)}
            >
              {tagValue}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default InputDropdownItem;
