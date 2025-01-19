import { PropsWithChildren } from 'react';

interface DateProps extends PropsWithChildren {
  className: string;
}

const Date = ({ children, className }: DateProps) => {
  return <div className={className}>{children}</div>;
};

export default Date;
