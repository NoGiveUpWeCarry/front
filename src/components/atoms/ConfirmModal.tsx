import ReactDOM from 'react-dom';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <p className='text-lg'>{message}</p>
        <div className='flex justify-end gap-4 mt-4'>
          <button
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
