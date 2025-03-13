interface Props {
  onClick: () => void;
}

const NewMessage = ({ onClick }: Props) => {
  return (
    <button
      className='absolute left-1/2 bottom-[170px] transform -translate-x-1/2 z-10 bg-black text-white px-2 py-1 rounded-3xl text-[13px]'
      onClick={onClick}
    >
      새로운 메시지가 있습니다
    </button>
  );
};

export default NewMessage;
