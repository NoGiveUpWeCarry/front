interface ContentsBodyProps {
  body: string;
  sliceBody?: boolean;
}

const ContentsBody = ({ body, sliceBody }: ContentsBodyProps) => {
  return (
    <div
      style={{
        display: sliceBody ? '-webkit-box' : 'block',
        WebkitBoxOrient: sliceBody ? 'vertical' : 'initial',
        overflow: sliceBody ? 'hidden' : 'visible',
        WebkitLineClamp: sliceBody ? 3 : 'unset',
      }}
      className='flex text-[14px] font-regular text-ellipsis break-all'
    >
      {body}
    </div>
  );
};

export default ContentsBody;
