import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import BranchCard from '../Branch_card/BranchCard';
import BranchHeader from '../Branch_Header/BranchHeader';
import AddBranchForm from '../AddBranchForm/AddBranchForm';

function Branches() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f8fafc]"> 
      <BranchHeader />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-end mt-8">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#050b1a] hover:bg-[#0a1429] text-white font-black text-sm rounded-2xl shadow-lg shadow-black/5 transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          <span>إضافة فرع جديد</span>
        </button>
      </div>

      <BranchCard />

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 left-6 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors z-10"
            >
              <X size={18} />
            </button>
            
            <AddBranchForm onBranchAdded={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Branches;