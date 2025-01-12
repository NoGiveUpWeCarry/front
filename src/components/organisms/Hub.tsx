import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { hubItem, HubItemType } from '@/mock/hubItem';
import { HubTagVariant } from '@/types/tags/hubTag.type';
import { ProjectTagVariant } from '@/types/tags/projectTag.type';
import { RoleTagVariant } from '@/types/tags/roleTag.type';
import { useEffect, useState } from 'react';

interface HubProps {
  keyword?: string;
}

const Hub = ({ keyword }: HubProps) => {
  const [data, setData] = useState<HubItemType[]>([]);

  useEffect(() => {
    if (!keyword) setData(hubItem);
    else {
      setData(
        data.filter(
          (el) =>
            el.title.includes(keyword) ||
            el.roleTags.map((t) => t.label).includes(keyword)
        )
      );
    }
  }, [keyword]);

  return (
    <div className='flex flex-col gap-[30px] w-full h-full'>
      {data.map((item) => (
        <HubContents
          key={item.title + new Date().toISOString()}
          user={item.user}
          title={item.title}
          projectTags={
            item.projectTags as { label: string; variant: ProjectTagVariant }[]
          }
          hubTags={item.hubTags as { label: string; variant: HubTagVariant }[]}
          roleTags={
            item.roleTags as { label: string; variant: RoleTagVariant }[]
          }
          role={item.role}
          bookmarkCount={item.bookmarkCount}
          userCount={item.userCount}
          viewsCount={item.viewsCount}
          thumbnail={item.thumbnail}
          startDate={item.startDate}
          duration={item.duration}
        />
      ))}
      {keyword && !data.length && (
        <div className='flex flex-col justify-center items-center'>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default Hub;
