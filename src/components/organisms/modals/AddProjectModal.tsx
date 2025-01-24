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

  const { projectForm, setSingleProjectForm, resetProjectForm } =
    useAddProjectFormStore(useShallow((state) => state));
  const [nickname] = useMyPageStore(useShallow((state) => [state.nickname]));

  const { mutate: addProject } = useAddProject();
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject(nickname);

  const handleImageSave = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSingleProjectForm('image', file);
    }
  };

  const successHandler = () => {
    queryClient.invalidateQueries({
      queryKey: ['profile-info', nickname],
    });
    resetProjectForm();
    onClose();
  };

  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.description) return;

    const form = new FormData();
    form.append('title', projectForm.title);
    form.append('description', projectForm.description);

    const links: { url: string; typeId: number }[] = [];
    ['github', 'web', 'ios', 'android'].forEach((key, i) => {
      if (projectForm[key as keyof typeof projectForm]) {
        links.push({
          url: projectForm[key as keyof typeof projectForm] as string,
          typeId: i + 1,
        });
      }
    });

    form.append('links', JSON.stringify(links));
    form.append('file', projectForm.image as File);

    if (isForUpdate) {
      updateProject(
        { projectId: projectForm.id, projectInfo: form },
        {
          onSuccess: successHandler,
        }
      );
    } else {
      addProject(
        { projectInfo: form },
        {
          onSuccess: successHandler,
        }
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSingleProjectForm(name, value);
  };

  const handleDeleteProject = () => {
    deleteProject({ projectId: projectForm.id });
    resetProjectForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className='!p-5'>
      <Modal.Title>프로젝트 추가</Modal.Title>
      <div className='flex gap-3'>
        <div
          className={`w-[98px] h-[98px] rounded-[10px] ${projectForm.image ? null : 'border border-[#838383]'} flex justify-center items-center cursor-pointer`}
          onClick={() => inputRef.current?.click()}
        >
          {projectForm.image ? (
            <img
              className='w-[98px] h-[98px] rounded-[10px] object-cover'
              src={
                projectForm.image instanceof File
                  ? URL.createObjectURL(projectForm.image)
                  : projectForm.image
              }
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
            value={projectForm.title}
            onChange={handleChange}
          />
          <Input
            bgColor='transparent'
            borderColor='dark'
            className='w-full'
            placeholder='프로젝트에 대해 입력해주세요'
            name='description'
            value={projectForm.description}
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
            value={projectForm.github}
            onChange={handleChange}
          />
          <UrlInput
            icon={<GlobeAltIcon width={16} />}
            category='Web'
            placeholder='Web URL을 입력해주세요'
            name='web'
            value={projectForm.web}
            onChange={handleChange}
          />
          <UrlInput
            icon={<img src='/src/assets/icons/apple.svg' width={17} />}
            category='iOS'
            placeholder='iOS 앱 URL을 입력해주세요'
            name='ios'
            value={projectForm.ios}
            onChange={handleChange}
          />
          <UrlInput
            icon={<img src='/src/assets/icons/android.svg' width={16} />}
            category='Android'
            placeholder='안드로이드 앱 URL을 입력해주세요'
            name='android'
            value={projectForm.android}
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
