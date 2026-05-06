import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import BranchTable from '../BranchTable/BranchTable';
import RenewDialog from '../BranchesModal/RenewDialog';
import {testBranches} from './lib'

const BrancheManager = ({ isOpen, setIsOpen }) => {
  // const [branches, SetBranches] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);


  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {!isOpen && <button onClick={() => setIsOpen(true)} className="p-3 bg-white rounded-2xl border"><Menu size={20}/></button>}
          <h2 className="text-2xl font-black">إدارة الفروع</h2>
        </div>
      </div>

      <BranchTable 
        branches={testBranches} 
        // onToggle={handleToggle} 
        // onDelete={handleDelete} 
        onRenew={(b) => { setSelectedBranch(b); setIsRenewModalOpen(true); }}
      />

      <RenewDialog 
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        branch={selectedBranch}
        // onSuccess={fetchBranches}
      />
    </div>
  );
};
export default BrancheManager;