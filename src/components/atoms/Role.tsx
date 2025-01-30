import { roleItems, roleItemsKey } from '@/constants/hub/roleItems';

export interface RoleProps {
  role: roleItemsKey;
}

const Role = ({ role }: RoleProps) => {
  return (
    <div className='flex text-[14px] font-extrabold'>{roleItems[role]}</div>
  );
};

export default Role;
