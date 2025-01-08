import { HubContents } from '@/components/molecules/contents/ContentsItem';
import { hubItem } from '@/mock/hubItem';

const Hub = () => {
  return (
    <div className='flex flex-col gap-[30px] w-full'>
      {hubItem.map((item, index) => (
        <HubContents
          key={index}
          user={item.user}
          title={item.title}
          projectTags={item.projectTags}
          hubTags={item.hubTags}
          roleTags={item.roleTags}
          role={item.role}
          bookmarkCount={item.bookmarkCount}
          userCount={item.userCount}
          viewsCount={item.viewsCount}
          thumbnail={item.thumbnail}
          startDate={item.startDate}
          duration={item.duration}
        />
      ))}
    </div>
  );
};

export default Hub;
