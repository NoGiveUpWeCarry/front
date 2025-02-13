interface ContentsTitleProps {
  title: string;
}

const FeedContentsTitle = ({ title }: ContentsTitleProps) => {
  return <div className='flex text-[20px] font-medium'>{title}</div>;
};

export default FeedContentsTitle;
