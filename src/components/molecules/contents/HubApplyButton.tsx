import Button from '@/components/atoms/Button';

interface ApplyButtonProps {
  text: string;
  gradient?: string;
}

const ApplyButton = ({ text, gradient }: ApplyButtonProps) => {
  return (
    <div className='flex items-center text-[18px] font-semibold'>
      <Button
        width='280px'
        height='50px'
        variants='filled'
        radius='md'
        className={gradient || 'bg-#cccccc'}
      >
        {text}
      </Button>
    </div>
  );
};

export const ProjectApplyButton = () => (
  <ApplyButton
    text='지원'
    gradient='bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE]'
  />
);

export const OutsourcingApplyButton = () => (
  <ApplyButton
    text='지원'
    gradient='bg-gradient-to-r from-[#FF8800] to-[#84FF74]'
  />
);

export const CompleteApplyButton = () => (
  <ApplyButton
    text='지원 완료'
    gradient='bg-gradient-to-r from-[#000000] to-[#BBBBBB]'
  />
);

export const CloseButton = () => (
  <ApplyButton
    text='마감'
    gradient='bg-gradient-to-r from-[#FF8800] to-[#FFA9BE]'
  />
);

export const ClosedButton = () => (
  <ApplyButton text='마감' gradient='bg-#cccccc' />
);

export default {
  ProjectApplyButton,
  OutsourcingApplyButton,
  CompleteApplyButton,
  CloseButton,
  ClosedButton,
};
