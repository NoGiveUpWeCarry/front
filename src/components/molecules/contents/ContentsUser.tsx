import Avatar from '@/components/atoms/Avatar';
import ContentsUserTitle from '@/components/atoms/contents/ConentsUserTitle';

interface ContentsUserProps {
  avatarSrc: string;
  name: string;
  job: string;
  time: string;
}

const ContentsUser = ({ avatarSrc, name, job, time }: ContentsUserProps) => {
  return (
    <div className='flex items-start space-x-3'>
      <Avatar src={avatarSrc} size='xs' alt={`${name} Avatar`} />
      <ContentsUserTitle name={name} job={job} time={time} />
    </div>
  );
};

export default ContentsUser;
