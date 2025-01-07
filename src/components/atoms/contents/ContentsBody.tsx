interface ContentsBodyProps {
  body: string;
}

const ContentsBody = ({ body }: ContentsBodyProps) => {
  return <div className=' flex text-[14px] font-regular'>{body}</div>;
};

export default ContentsBody;
