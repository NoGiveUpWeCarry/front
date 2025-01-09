import Icon from '@/components/atoms/Icon';

interface MenuProps {
  items: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star';
    label?: string;
    onClick?: () => void;
  }[];
}

const Menu = ({ items }: MenuProps) => {
  return (
    <nav
      className='
        flex flex-col 
        w-[68px] 
        space-y-[80px]
        transition-all
        duration-300
        ease-in-out
        items-center
      '
    >
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className='
            group 
            flex 
            items-center 
            cursor-pointer 
            transition-all
            duration-300 
            ease-in-out
          '
        >
          <div className='flex-shrink-0'>
            <Icon
              type={item.type}
              className='
                h-7 
                w-7 
                text-[#838383]
                transition-all
                duration-200
                ease-in-out
                group-hover:text-black
              '
            />
          </div>

          {item.label && (
            <span
              className='
                ml-2
                text-[14px]
                whitespace-nowrap
                text-black
                transition-all
                duration-200
                ease-in-out
                opacity-0
                w-0
                -translate-x-0
                group-hover:opacity-100
                group-hover:w-
                group-hover:translate-x-0
                group-hover:text-black
              '
            >
              {item.label}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
