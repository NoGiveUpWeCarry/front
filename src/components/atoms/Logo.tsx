interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width = 60, height = 24, className = '' }: LogoProps) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <img
        src='/src/assets/logos/PAD.svg'
        alt='PAD Logo'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Logo;
