interface ContentsTitleProps {
  title: string;
}

const ContentsTitle = ({ title }: ContentsTitleProps) => {
  return <div className='flex text-[20px] font-medium'>{title}</div>;
};

export default ContentsTitle;
