import React, { useState } from 'react';
import ProgrammerSidebar from "@/components/Programer_components/ProgrammerSidebar/ProgrammerSidebar";

export const ProgramerLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      <ProgrammerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <main className="flex-1 overflow-y-auto">
        {React.cloneElement(children, { isOpen, setIsOpen })}
      </main>
    </div>
  );
};

export default ProgramerLayout;