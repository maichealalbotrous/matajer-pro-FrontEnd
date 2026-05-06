import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import KeyTable from '../KeyTable/KeyTable';
import GenerateKeyDialog from '../GenerateKeyDialog/GenerateKeyDialog';
import {testSubKeys} from './lib'

const SubscriptionKeysManager = ({ isOpen, setIsOpen }) => {
//   const [keys, setKeys] = useState([]);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);


  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="flex justify-between flex-wrap gap-2 items-center mb-8">
        <div className="flex items-center gap-4">
          {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="p-3 bg-white border rounded-2xl shadow-sm">
              <Menu size={20} />
            </button>
          )}
          <h2 className="text-2xl font-black">أكواد الاشتراكات</h2>
        </div>

        <button 
          onClick={() => setIsGenerateOpen(true)} 
          className="bg-[#0f172a] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-black transition-all"
        >
          <Plus size={18} /> توليد أكواد جديدة
        </button>
      </div>

      <KeyTable
        keys={testSubKeys} 
       />

      <GenerateKeyDialog
        isOpen={isGenerateOpen} 
        onClose={() => setIsGenerateOpen(false)} 
        // onSuccess={fetchKeys}
      />
    </div>
  );
};

export default SubscriptionKeysManager;