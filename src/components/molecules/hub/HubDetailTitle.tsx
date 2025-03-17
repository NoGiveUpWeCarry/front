export interface HubDetailTitleProps {
  title: string;
}

const HubDetailTitle = ({ title }: HubDetailTitleProps) => {
  return <div className='flex text-[20px] font-semibold'>{title}</div>;
};

export default HubDetailTitle;
