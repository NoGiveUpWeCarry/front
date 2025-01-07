import React from 'react';
import SideBar from '@/components/organisms/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

const Layouts = () => {
  const location = useLocation();
  const preventInfo = ['/settings'];

  return (
    <div className='min-h-screen bg-[#F5F5F5] flex'>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className='flex-1 p-6'>
        {/* Header */}
        {!preventInfo.includes(location.pathname) && (
          <div className='absolute flex justify-end right-0 mr-6'>
            <div className='w-[300px] bg-white shadow-md p-4'>
              <h2 className='font-bold'>PAD Contact</h2>
              <p className='text-sm'>
                PAD Inc.
                <br />
                Republic of Korea
                <br />
                123-456-7890
                <br />
                info@pad.com
              </p>
            </div>
          </div>
        )}
        {/* Page Content */}
        <div className='mt-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layouts;
