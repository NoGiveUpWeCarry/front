import Modal, { ModalProps } from '@/components/organisms/modals/Modal';
import { ImgHTMLAttributes } from 'react';

interface ChatImageModalProps
  extends Pick<ImgHTMLAttributes<HTMLImageElement>, 'src'>,
    ModalProps {}

const ChatImageModal = ({ src, ...props }: ChatImageModalProps) => {
  return (
    <Modal {...props}>
      <img src={src} />
    </Modal>
  );
};

export default ChatImageModal;
