import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ backgroundImage: 'url("/images/Member/MemberBackground.png")' }}
      className='w-screen min-h-screen bg-cover bg-center z--10 flex justify-center items-center'
    >
      
      {children}
    </div>
  );
};

export default Layout;
