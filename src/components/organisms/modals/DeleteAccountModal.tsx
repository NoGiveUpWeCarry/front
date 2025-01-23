import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useDeleteAccount } from '@/hooks/queries/mypage/settings';
import useAuthStore from '@/store/authStore';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const DeleteAccountModal = ({ onClose }: ModalProps) => {
  const [userInfo, logout] = useAuthStore(
    useShallow((state) => [state.userInfo, state.logout])
  );

  const { mutate } = useDeleteAccount();

  const [email, setEmail] = useState('');

  const handleDeleteAccount = () => {
    if (email !== userInfo?.email) {
      alert('이메일이 일치하지 않습니다.');
      onClose();
      return;
    }

    mutate(undefined, {
      onSuccess: () => {
        alert('탈퇴되었습니다.');
        window.location.href = '/';
        logout();
        onClose();
      },
    });
  };

  return (
    <Modal onClose={onClose} className='w-[400px] !px-[30px]'>
      <Modal.Title>계정 삭제</Modal.Title>
      <span>정말 삭제하시려면 이메일을 다시 입력해주세요.</span>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='mt-4 bg-transparent'
        placeholder='이메일을 입력해주세요'
      />
      <div className='flex justify-end items-center gap-3 mt-8'>
        <Button
          width='100px'
          height='40px'
          radius='md'
          className='border border-[#838383] text-[#838383]'
        >
          취소
        </Button>
        <Button
          width='100px'
          height='40px'
          radius='md'
          className='bg-red-500'
          onClick={handleDeleteAccount}
        >
          탈퇴
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
