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
      className='flex flex-col items-center w-[60px] h-auto space-y-[60px]'
      style={{
        clipPath: 'content-box',
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className='flex items-center justify-center w-[24px] h-[24px]'
        >
          <Icon type={item.type} className='text-black hover:text-gray-600' />
        </button>
      ))}
    </nav>
  );
};

export default Menu;
