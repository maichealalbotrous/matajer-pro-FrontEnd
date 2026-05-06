import BrancheManager from '@/components/Programer_components/Branches/BrancheManager/BrancheManager';
import React from 'react';

function Branches_page({ isOpen, setIsOpen }) {
  return (
    <div>
      <BrancheManager isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Branches_page;