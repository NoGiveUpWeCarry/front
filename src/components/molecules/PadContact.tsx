import GitHubIcon from '@/assets/icons/github.svg';

const PadContact = () => {
  return (
    <div className='flex flex-col gap-[5px] px-[30px] py-3 bg-white rounded-[10px] text-gray-600 leading-relaxed space-y-1'>
      <div className='flex w-full justify-between items-center'>
        <p className='font-bold text-[24px]'>PAD inc.</p>
      </div>
      <div className='flex flex-col font-semibold text-[16px]'>Team PAD</div>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col gap-[5px]'>
          <div className='flex font-semibold text-[20px] '>FE</div>
          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>chaeyun</div>
            <a href='https://github.com/chaeyun-sim'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>

          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>jaehyeok</div>
            <a href='https://github.com/JaeHye0k'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>
          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>chan</div>
            <a href='https://github.com/dlcks0601'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>
          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>taedong</div>
            <a href='https://github.com/HANTAEDONG'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <div className='flex font-semibold text-[20px]'>BE</div>
          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>seongmin</div>
            <a href='https://github.com/Ss0Mae'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>
          <div className='flex items-center gap-[5px] w-full justify-between'>
            <div>donghyun</div>
            <a href='https://github.com/peppertown'>
              <img
                src={GitHubIcon}
                alt='GitHub'
                className='w-5 h-5 hover:opacity-80 transition-opacity'
              />
            </a>
          </div>
        </div>
      </div>
      <div className='flex font-light text-[12px] cursor-pointer'>
        info@PAD.com
      </div>
      <div className='flex font-extralight text-[10px] w-full justify-between items-center'>
        © 2024 PAD. All Rights Reserved.
        <a href='https://github.com/NoGiveUpWeCarry'>
          <img
            src={GitHubIcon}
            alt='GitHub'
            className='w-5 h-5 hover:opacity-80 transition-opacity'
          />
        </a>
      </div>
    </div>
  );
};

export default PadContact;
