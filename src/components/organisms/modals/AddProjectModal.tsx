import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import UrlInput from '@/components/molecules/UrlInput';
import Modal from '@/components/organisms/modals/Modal';
import { ModalProps } from '@/components/organisms/modals/modalProps';
import {
  useAddProject,
  useDeleteProject,
  useUpdateProject,
} from '@/hooks/queries/mypage/introduce';
import { useAddProjectFormStore } from '@/store/addProjectFormStore';
import { useMyPageStore } from '@/store/mypageStore';
import queryClient from '@/utils/queryClient';
import { CameraIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

const AddProjectModal = ({
  onClose,
  isOpen,
  isForUpdate,
}: ModalProps & { isOpen: boolean; isForUpdate: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { formData, setFormData, resetFormData } = useAddProjectFormStore(
    useShallow((state) => state)
  );
  const [ownerId] = useMyPageStore(useShallow((state) => [state.ownerId]));

  const { mutate: addProject } = useAddProject();
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject(ownerId);

  const handleImageSave = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData('imageUrl', file);
    }
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description) return;

    let links = [];
    if (formData.github) links.push({ url: formData.github, typeId: 1 });
    if (formData.web) links.push({ url: formData.web, typeId: 2 });
    if (formData.ios) links.push({ url: formData.ios, typeId: 3 });
    if (formData.android) links.push({ url: formData.android, typeId: 4 });

    const newForm = {
      title: formData.title,
      description: formData.description,
      links: links,
    };

    const successHandler = () => {
      queryClient.invalidateQueries({
        queryKey: ['profile-info', ownerId],
      });
      resetFormData();
      onClose();
    };

    if (isForUpdate) {
      updateProject(
        { projectId: formData.id, projectInfo: newForm },
        {
          onSuccess: successHandler,
        }
      );
    } else {
      addProject(
        { projectInfo: newForm },
        {
          onSuccess: successHandler,
        }
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  const handleDeleteProject = () => {
    deleteProject({ projectId: formData.id });
    resetFormData();
    onClose();
  };

  if (!isOpen) return null;

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
        <div className='flex flex-col justify-center gap-4 h-[98px] flex-1'>
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
      <div className='my-[30px] flex justify-center items-center gap-5'>
        {isForUpdate && (
          <Button
            variants='outline'
            width='92px'
            height='29px'
            radius='lg'
            className='text-red-500 border !border-red-500'
            onClick={() => handleDeleteProject()}
          >
            삭제
          </Button>
        )}
        <Button
          variants='filled'
          width='92px'
          height='29px'
          radius='lg'
          className='bg-[#FF7E5F]'
          onClick={() => handleSaveProject()}
        >
          {isForUpdate ? '수정' : '저장'}
        </Button>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
