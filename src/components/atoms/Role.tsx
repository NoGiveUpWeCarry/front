export interface RoleProps {
  role: 'PROGRAMMER' | 'ARTIST' | 'DESIGNER';
}

const Role = ({ role }: RoleProps) => {
  return <div className='flex text-[14px] font-extrabold'>{role}</div>;
};

export default Role;
