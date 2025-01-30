import { useEffect, useState } from 'react';
import { HubState } from '@/store/postHubStore';
import useHubStore from '@/store/postHubStore';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Icon from '@/components/atoms/Icon';
import JobSelect from '@/components/atoms/Select/JobSelect';
import SkillSelect from '@/components/atoms/Select/SkillSelect';
import ProjectTypeSelect from '@/components/atoms/Select/ProjectTypeSelect';
import WorkTypeSelect from '@/components/atoms/Select/WorkTypeSelect';

interface PostHubContentFirstProps {
  onNext: () => void;
}

const PostHubContentFirst = ({ onNext }: PostHubContentFirstProps) => {
  const {
    title,
    role,
    hubType,
    startDate,
    duration,
    durationType,
    workType,
    skills,
    detailRoles,
    setTitle,
    setRole,
    setHubType,
    setStartDate,
    setDuration,
    setDurationType,
    setWorkType,
    setSkills,
    setDetailRoles,
  } = useHubStore();

  const [hubContent, setHubContent] = useState<Omit<HubState, 'content'>>({
    title: '',
    role: '',
    hubType: 'PROJECT',
    startDate: '',
    duration: '',
    durationType: '',
    workType: 'OFFLINE',
    recruiting: false,
    skills: [],
    detailRoles: [],
  });

  const [errors, setErrors] = useState({
    title: false,
    role: false,
    startDate: false,
  });

  useEffect(() => {
    setHubContent({
      title,
      role,
      hubType,
      startDate,
      duration,
      durationType,
      workType,
      skills,
      detailRoles,
      recruiting: false,
    });
  }, [
    title,
    role,
    hubType,
    startDate,
    duration,
    durationType,
    workType,
    skills,
    detailRoles,
  ]);

  const handleChange = (field: keyof HubState, value: string | string[]) => {
    setHubContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {
      title: hubContent.title.trim() === '',
      role: hubContent.role.trim() === '',
      startDate: hubContent.startDate.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSaveToStore = () => {
    if (validateFields()) {
      setTitle(hubContent.title);
      setRole(hubContent.role);
      setHubType(hubContent.hubType);
      setStartDate(hubContent.startDate);
      setDuration(hubContent.duration);
      setDurationType(hubContent.durationType);
      setWorkType(hubContent.workType);
      setSkills(hubContent.skills);
      setDetailRoles(hubContent.detailRoles);
      onNext();
    }
  };

  const handleSkillRemove = (skill: string) => {
    const updatedSkills = hubContent.skills.filter((s) => s !== skill);
    setHubContent((prev) => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div className='flex flex-col items-start w-full gap-[20px]'>
      <div className='flex flex-col items-start w-full gap-[5px]'>
        <div className='flex text-[20px] font-semibold'>제목</div>
        <Input
          type='text'
          placeholder='제목을 입력해주세요.'
          className={`w-full border h-[44px] ${errors.title ? 'border-red-500' : 'border-black'}`}
          value={hubContent.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        {errors.title && (
          <p className='text-red-500 text-sm'>제목을 입력해주세요.</p>
        )}
      </div>
      <div className='flex flex-col items-start w-full gap-[5px]'>
        <div className='flex text-[20px] font-semibold'>직군</div>
        <JobSelect
          className='border-black'
          handleChange={handleChange}
          selectedRole={hubContent.role}
          selectedUnits={hubContent.detailRoles}
        />
        {errors.role && (
          <p className='text-red-500 text-sm'>직군을 선택해주세요.</p>
        )}
      </div>
      <div className='flex flex-col items-start w-full gap-[5px]'>
        <div className='flex text-[20px] font-semibold'>스킬</div>
        <SkillSelect
          onSkillSelect={(skill) =>
            handleChange('skills', [...hubContent.skills, skill])
          }
          selectedSkills={hubContent.skills}
        />
      </div>
      <div className='flex border w-full border-black rounded-sm h-[44px]'>
        <div className='flex items-center px-[10px] py-[10px] gap-[10px]'>
          {hubContent.skills.length === 0 ? (
            <span className='text-[12px] text-[#FF6868]'>
              스킬을 선택해주세요.
            </span>
          ) : (
            hubContent.skills.map((skill) => (
              <div
                key={skill}
                className='flex text-[12px] items-center px-2 py-1 bg-[#EAEAEA] rounded-sm'
              >
                <span className='mr-1'>{skill}</span>
                <button
                  className='text-black'
                  onClick={() => handleSkillRemove(skill)}
                >
                  <Icon
                    type='xmark'
                    color='black'
                    className='w-[18px] h-[18px]'
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <div className='flex gap-[20px]'>
        <div className='flex flex-col items-start w-full gap-[5px]'>
          <div className='flex text-[20px] font-semibold'>시작 희망일</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-[280px] h-[44px] justify-start text-left font-normal bg-white',
                  errors.startDate ? 'border-red-500' : 'border-black'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {hubContent.startDate ? (
                  hubContent.startDate
                ) : (
                  <span>날짜를 선택해주세요.</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={
                  hubContent.startDate
                    ? new Date(hubContent.startDate)
                    : undefined
                }
                onSelect={(date) => {
                  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
                  handleChange('startDate', formattedDate);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className='text-red-500 text-sm'>시작 희망일을 선택해주세요.</p>
          )}
        </div>
        <div className='flex flex-col items-start w-full gap-[5px]'>
          <div className='flex text-[20px] font-semibold'>기간</div>
          <div className='flex items-center gap-2'>
            <Select
              onValueChange={(value) => handleChange('durationType', value)}
              value={hubContent.durationType}
            >
              <SelectTrigger className='w-[90px] border border-black rounded-sm h-[44px]'>
                <SelectValue placeholder={hubContent.durationType || '단위'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='개월'>개월</SelectItem>
                <SelectItem value='주'>주</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='number'
              placeholder='0'
              className='w-[90px] border border-black rounded-sm h-[44px]'
              value={hubContent.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-[20px]'>
        <div className='flex flex-col items-start w-full gap-[5px]'>
          <div className='flex text-[20px] font-semibold'>허브 유형</div>
          <ProjectTypeSelect
            selectedHubType={hubContent.hubType}
            onChange={(value) => handleChange('hubType', value)}
          />
        </div>
        <div className='flex flex-col items-start w-full gap-[5px]'>
          <div className='flex text-[20px] font-semibold'>작업 방식</div>
          <WorkTypeSelect
            selectedWorkType={hubContent.workType}
            onChange={(value) => handleChange('workType', value)}
          />
        </div>
      </div>
      <div className='flex w-full justify-end'>
        <button
          type='button'
          className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
          onClick={handleSaveToStore}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PostHubContentFirst;
