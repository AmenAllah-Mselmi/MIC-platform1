import React from 'react';
import Navbar from '../_MICcomponents/navbar/navbar';
import {ScrollShadow} from "@nextui-org/scroll-shadow";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
    <Navbar />
    <div
      style={{ backgroundImage: 'url("/images/Member/MemberBackground.png")' }}
      className='w-screen min-h-screen bg-cover bg-center z--10 flex justify-center items-center pt-28'
    >
      <ScrollShadow size={20} className="w-full h-screen">
      {children}
    </ScrollShadow>

    </div>
    </>
  );
};

export default Layout;
