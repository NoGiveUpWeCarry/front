import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import GithubIcon from '@/assets/icons/Github.svg';
import GoogleIcon from '@/assets/icons/Google.svg';

export const LoginButtonVariants = cva(
  `
  w-[410px] h-[66px] flex justify-center items-center gap-[8px]
  rounded-full border border-black
  text-heading2 font-semibold
  hover:shadow-md active:scale-95 transition-transform
  `,
  {
    variants: {
      icon: {
        github: 'bg-white',
        google: 'bg-white',
      },
    },
    defaultVariants: {},
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof LoginButtonVariants> {
  label?: string;
  iconType?: 'github' | 'google';
}

const LoginButton = (props: ButtonProps) => {
  const { iconType, label, ...rest } = props;

  return (
    <button className={cn(LoginButtonVariants({ icon: iconType }))} {...rest}>
      {iconType === 'github' && (
        <img src={GithubIcon} alt='Github Icon' className='w-6 h-6' />
      )}
      {iconType === 'google' && (
        <img src={GoogleIcon} alt='Google Icon' className='w-6 h-6' />
      )}
      {label && <span>{label}</span>}
    </button>
  );
};

export default LoginButton;
