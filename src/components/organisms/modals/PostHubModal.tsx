import * as React from 'react';
import {
  HubCategory,
  HubSelect,
  SetWork,
  SkillSelect,
} from '@/components/atoms/contents/ContentsSelect';
import Icon from '@/components/atoms/Icon';
import Modal2 from '@/components/molecules/Modal';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import TiptapEditor from '@/components/organisms/TiptapEditor';

interface PostHubModalProps {
  onClose: () => void;
}

// interface AppState {
//   content: string;
//   setContent: (content: string) => void;
// }

const PostHubModal = ({ onClose }: PostHubModalProps) => {
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  const handleUnitSelect = (unit: string) => {
    if (!selectedUnits.includes(unit)) {
      setSelectedUnits((prev) => [...prev, unit]);
    }
  };

  const handleUnitRemove = (unit: string) => {
    setSelectedUnits((prev) => prev.filter((u) => u !== unit));
  };

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const [date, setDate] = React.useState<Date>();

  const [durationType, setDurationType] = useState<string>('개월'); // 기간 단위

  const [durationValue, setDurationValue] = useState<string>(''); // 기간 값

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const [content, setContent] = useState<string>('');

  const [errors] = useState<{
    title: boolean;
    tags: boolean;
    content: boolean;
  }>({
    title: false,
    tags: false,
    content: false,
  });

  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>새 허브</Modal2.Title>
      <div className='flex flex-col items-start w-full gap-[20px]'>
        {currentStep === 1 && (
          <>
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>제목</div>
              <Input
                type='title'
                placeholder='제목을 입력해주세요.'
                className='w-full border-black h-[44px]'
              />
            </div>
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>직군</div>
              <HubSelect
                className='border-black'
                onUnitSelect={handleUnitSelect}
              />
            </div>
            <div className='flex border w-full border-black rounded-sm h-[44px]'>
              <div className='flex items-center px-[10px] py-[10px] gap-[10px]'>
                {selectedUnits.length === 0 ? (
                  <span className='text-[12px] text-[#FF6868]'>
                    직군을 선택해주세요.
                  </span>
                ) : (
                  selectedUnits.map((unit) => (
                    <div
                      key={unit}
                      className='flex text-[12px] items-center px-2 py-1 bg-[#EAEAEA] rounded-sm'
                    >
                      <span className='mr-1'>{unit}</span>
                      <button
                        className='text-black '
                        onClick={() => handleUnitRemove(unit)}
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
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>스킬</div>
              <SkillSelect onSkillSelect={handleSkillSelect} />
            </div>
            <div className='flex border w-full border-black rounded-sm h-[44px]'>
              <div className='flex items-center px-[10px] py-[10px] gap-[10px]'>
                {selectedSkills.length === 0 ? (
                  <span className='text-[12px] text-[#FF6868]'>
                    스킬을 선택해주세요.
                  </span>
                ) : (
                  selectedSkills.map((skill) => (
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
                <div className='flex text-[20px] font-semibold'>
                  시작 희망일
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-[280px] h-[44px] justify-start text-left font-normal bg-white border-black',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {date ? (
                        format(date, 'yyyy-MM-dd')
                      ) : (
                        <span>날짜를 선택해주세요.</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>기간</div>
                <div className='flex items-center gap-2'>
                  <Select onValueChange={setDurationType} value={durationType}>
                    <SelectTrigger className='w-[90px] border border-black rounded-sm h-[44px]'>
                      <SelectValue placeholder='단위' />
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
                    value={durationValue}
                    onChange={(e) => setDurationValue(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='flex gap-[20px]'>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>허브 유형</div>
                <HubCategory />
              </div>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>작업 방식</div>
                <SetWork />
              </div>
            </div>

            <div className='flex w-full justify-end'>
              <div className='flex gap-[10px]'>
                <button className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'>
                  취소
                </button>
                <button
                  className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
                  onClick={handleNextStep}
                >
                  다음
                </button>
              </div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className='flex flex-col items-start w-full h-full gap-[10px]'>
              <div className='flex text-[20px] font-semibold'>허브 소개</div>
              <div className='flex flex-col w-full px-[10px] py-[20px] h-[573px] overflow-y-scroll scrollbar-hide border rounded-md border-black'>
                <TiptapEditor content={content} setContent={setContent} />
                {errors.content && (
                  <p className='flex flex-col text-red-600 text-[14px] mt-5 absolute'>
                    내용을 작성해주세요.
                  </p>
                )}
              </div>
              <div className='flex w-full justify-end'>
                <div className='flex gap-[10px]'>
                  <button
                    className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'
                    onClick={handlePrevStep}
                  >
                    이전
                  </button>
                  <button className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'>
                    완료
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal2>
  );
};

export default PostHubModal;
