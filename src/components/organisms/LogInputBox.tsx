import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import { cva } from 'class-variance-authority';

const LogInputBox = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setIsEmpty(e.currentTarget.innerText.trim() === '');
  };

  const buttonClass = cva(
    'px-2 flex items-center bg-gradient-to-b from-[#2c2c2e]/70 to-[#2c2c2e] text-white font-normal shadow-primary-button hover:shadow-primary-button-hover text-xs transform transition-all duration-150 py-1.5 rounded-lg',
    {
      variants: {
        disabled: {
          true: 'opacity-50 cursor-not-allowed hover:!shadow-primary-button h-full',
        },
      },
      defaultVariants: {
        disabled: false,
      },
    }
  );

  return (
    <div className='bg-white rounded-xl flex flex-col w-[100%] h-36'>
      <div className='py-2 px-3 flex border-b border-[rgb(242, 242, 247)] border-opacity-50 justify-between items-center h-9'>
        <div className='text-sm'>피드를 작성해보세요.</div>
      </div>
      <div className='false h-14 flex-1'>
        <div className='h-full pt-2 px-3 min-h-14 w-full overflow-auto text-sm focus:border-0 md:max-h-[300px]'>
          <div
            className='ProseMirror focus:outline-none break-all cursor-text'
            contentEditable='true'
            translate='no'
            tabIndex={0}
            onInput={handleInput}
          >
            {isEmpty && (
              <p
                className='focus:outline-none break-all is-empty before:text-text-tertiary before:content-[attr(data-placeholder)] before:h-0 before:block'
                data-placeholder='어떤 것을 만들고 있나요?'
              >
                <br className='ProseMirror-trailingBreak' />
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='h-[52px] py-3 px-3 flex justify-between'>
        <div className='flex items-end space-x-2 relative'>
          <Icon
            type='photo'
            className='w-[22px] h-[22px] text-[rgb(242, 242, 247)] hover:bg-gray cursor-pointer'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && (
            <div className='absolute top-[-30px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-1000'>
              이미지 첨부
            </div>
          )}
        </div>
        <div className={buttonClass({ disabled: isEmpty })}>로그 남기기</div>
      </div>
    </div>
  );
};

export default LogInputBox;
