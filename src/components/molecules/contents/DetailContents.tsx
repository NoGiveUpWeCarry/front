interface DetailContentsProps {
  content: string;
}

const DetailContents = ({ content }: DetailContentsProps) => {
  return (
    <div
      className='flex flex-col prose max-w-none border h-[600px] rounded-[10px] p-[10px]'
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default DetailContents;
