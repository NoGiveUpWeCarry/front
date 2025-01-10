import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';

const FollowersModal = ({ onClose }: ModalProps) => {
  return (
    <Modal onClose={onClose} width='320px' height='460px'>
      hi
    </Modal>
  );
};

export default FollowersModal;
