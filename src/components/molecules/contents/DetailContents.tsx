interface DetailContentsProps {
  contents: string;
}

const DetailContents = ({ contents }: DetailContentsProps) => {
  return (
    <div className='flex w-full border rounded-[10px] h-[400px] p-[10px]'>
      {contents}
    </div>
  );
};

export default DetailContents;
