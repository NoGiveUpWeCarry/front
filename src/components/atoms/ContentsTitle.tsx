interface ContentsTitleProps {
  title: string;
}

const ContentsTitle = ({ title }: ContentsTitleProps) => {
  return (
    <div className='text-texts-primary line-clamp-2 text-base font-medium sm:text-lg sm:leading-[140%]'>
      {title}
    </div>
  );
};

export default ContentsTitle;
