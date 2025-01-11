interface ToggleProps {
  active: boolean;
  toggle: () => void;
}

const Toggle = ({ active, toggle }: ToggleProps) => {
  return (
    <button
      className={`relative w-[56px] h-[32px] rounded-[32px] ${active ? 'bg-black' : 'bg-[#E8E8E8]'} transition-colors duration-300`}
      onClick={toggle}
    >
      <div
        className='w-[26px] h-[26px] rounded-full bg-white transition-transform duration-300 shadow-[0_3px_8px_rgba(0,0,0,0.15)]'
        style={{ transform: active ? 'translateX(27px)' : 'translateX(3px)' }}
      />
    </button>
  );
};

export default Toggle;
