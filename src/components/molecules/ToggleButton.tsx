import { HTMLAttributes } from 'react';

interface SearchToggleProps
  extends React.PropsWithChildren,
    HTMLAttributes<HTMLButtonElement> {}

const ToggleButton = ({ children, ...props }: SearchToggleProps) => {
  return <button {...props}>{children}</button>;
};

export default ToggleButton;
