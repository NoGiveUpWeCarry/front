const LoadingDots = () => {
  return (
    <div className='relative flex items-center justify-center'>
      <span className='w-2.5 h-2.5 bg-[#9880ff] rounded-full animate-flashing [animation-delay:0s] relative -left-4'></span>
      <span className='w-2.5 h-2.5 bg-[#9880ff] rounded-full animate-flashing [animation-delay:0.5s]'></span>
      <span className='w-2.5 h-2.5 bg-[#9880ff] rounded-full animate-flashing [animation-delay:1s] relative -right-4'></span>
    </div>
  );
};

export default LoadingDots;
