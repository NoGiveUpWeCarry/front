interface SideBarTitleProps {
  title: string;
  className?: string;
}

const SideBarTitle = ({ title, className = '' }: SideBarTitleProps) => {
  return (
    <div className={`text-[14px] font-medium text-balck ${className}`}>
      {title}
    </div>
  );
};

export default SideBarTitle;
