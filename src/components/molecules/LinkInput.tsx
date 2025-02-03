import { LinkIcon } from '@heroicons/react/24/outline';
import useDebounce from '@/hooks/useDebounce';
import UrlInput from '@/components/molecules/UrlInput';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDeleteLink, useUpdateLink } from '@/hooks/queries/mypage/settings';
import { useSettingsStore } from '@/store/settingsStore';
import { useShallow } from 'zustand/shallow';

import notionIcon from '@/assets/icons/notion.svg';
import githubIcon from '@/assets/icons/github.svg';
import figmaIcon from '@/assets/icons/figma.svg';
import linkedInIcon from '@/assets/icons/linkedin.svg';

const MY_LINKS = {
  notion: notionIcon,
  github: githubIcon,
  figma: figmaIcon,
  linkedin: linkedInIcon,
};

interface UrlInputProps {
  link: { linkId: number; url: string };
  index: number;
}

const LinkInput = ({ link, index }: UrlInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [settingsForm, setSettingsForm] = useSettingsStore(
    useShallow((state) => [state.settingsForm, state.setSettingsForm])
  );

  const debouncedUrl = useDebounce(link.url, 300);

  const { mutate: updateLink } = useUpdateLink();
  const { mutate: deleteLink } = useDeleteLink();

  const handleDelete = () => {
    deleteLink({
      linkId: link.linkId,
    });
  };

  useEffect(() => {
    if (isFocused && debouncedUrl) {
      updateLink({
        linkId: link.linkId,
        url: debouncedUrl,
      });
    }
  }, [debouncedUrl, link.linkId, isFocused]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = settingsForm.links.map((el) =>
      el.linkId === link.linkId ? { ...el, url: e.target.value } : el
    );

    setSettingsForm({ ...settingsForm, links: updatedLinks });
  };

  const extractServiceName = (url: string) => {
    const domain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
    return domain.split('.')[0];
  };

  const getCategoryName = (keyword: string) => {
    const matchedKey = Object.keys(MY_LINKS).find((key) => keyword === key);
    return {
      text: matchedKey
        ? matchedKey[0].toUpperCase() + matchedKey.slice(1)
        : `Link`,
      icon: matchedKey ? (
        <img
          src={MY_LINKS[matchedKey as keyof typeof MY_LINKS]}
          alt={matchedKey}
          width={16}
        />
      ) : (
        <LinkIcon width={16} />
      ),
    };
  };

  const keyword = extractServiceName(debouncedUrl);
  const { text, icon } = getCategoryName(keyword);

  return (
    <UrlInput
      key={`input-${index}`}
      icon={icon}
      category={text}
      placeholder='링크를 입력해주세요'
      name={text}
      value={link.url}
      onDelete={handleDelete}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default LinkInput;
