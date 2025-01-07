import Icon from '@/components/atoms/Icon';

interface MenuProps {
  items: {
    type: 'bell' | 'mail' | 'home' | 'search' | 'star'; // 아이콘 타입
    label?: string; // 메뉴 이름 (옵션)
    onClick?: () => void; // 클릭 이벤트 핸들러 (옵션)
  }[];
}

const Menu = ({ items }: MenuProps) => {
  return (
    <nav
      className='flex flex-col items-center w-[60px] h-auto space-y-[40px] py-4'
      style={{
        clipPath: 'content-box', // Figma 스타일을 반영
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
