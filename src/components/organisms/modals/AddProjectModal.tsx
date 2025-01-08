import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import UrlInput from '@/components/molecules/UrlInput';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import { useAddProjectFormStore } from '@/store/addProjectFormStore';
import { CameraIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

const AddProjectModal = ({ onClose }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useAddProjectFormStore(
    useShallow((state) => [state.formData, state.setFormData])
  );

  const handleImageSave = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData('imageUrl', file);
    }
  };

  const handleSaveProject = () => {
    // 로직
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  return (
    <Modal onClose={onClose} width='444px' height='494px' className='!p-5'>
      <Modal.Title>프로젝트 추가</Modal.Title>
      <div className='flex gap-3'>
        <div
          className={`w-[98px] h-[98px] rounded-[10px] ${formData.imageUrl ? null : 'border border-[#838383]'} flex justify-center items-center cursor-pointer`}
          onClick={() => inputRef.current?.click()}
        >
          {formData.imageUrl ? (
            <img
              className='w-[98px] h-[98px] rounded-[10px] object-cover'
              src={URL.createObjectURL(formData.imageUrl)}
            />
          ) : (
            <CameraIcon width={24} />
          )}
        </div>
        <input type='file' hidden ref={inputRef} onChange={handleImageSave} />
        <div className='flex flex-col gap-3 flex-1'>
          <Input
            bgColor='transparent'
            borderColor='dark'
            className='w-full'
            placeholder='프로젝트 이름을 입력해주세요'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            bgColor='transparent'
            borderColor='dark'
            className='w-full'
            placeholder='프로젝트에 대해 입력해주세요'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='w-full mt-4 bg-[#EAEAEA] p-5 rounded-[10px]'>
        <div className='flex flex-col gap-[13px] text-[15px]'>
          <UrlInput
            icon={<img src='/src/assets/icons/github.svg' width={16} />}
            category='Github'
            placeholder='Github URL을 입력해주세요'
            name='github'
            value={formData.github}
            onChange={handleChange}
          />
          <UrlInput
            icon={<GlobeAltIcon width={16} />}
            category='Web'
            placeholder='Web URL을 입력해주세요'
            name='web'
            value={formData.web}
            onChange={handleChange}
          />
          <UrlInput
            icon={<img src='/src/assets/icons/apple.svg' width={17} />}
            category='iOS'
            placeholder='iOS 앱 URL을 입력해주세요'
            name='ios'
            value={formData.ios}
            onChange={handleChange}
          />
          <UrlInput
            icon={<img src='/src/assets/icons/android.svg' width={16} />}
            category='Android'
            placeholder='안드로이드 앱 URL을 입력해주세요'
            name='android'
            value={formData.android}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='my-[30px] flex justify-center items-center'>
        <Button
          variants='filled'
          width='92px'
          height='29px'
          radius='lg'
          className='bg-[#FF7E5F]'
          onClick={handleSaveProject}
        >
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
