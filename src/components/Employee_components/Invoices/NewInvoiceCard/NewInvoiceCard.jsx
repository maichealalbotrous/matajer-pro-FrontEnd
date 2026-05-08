import React from 'react';
import { ShoppingCart } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import { Link } from 'react-router-dom';

const NewInvoiceCard = ({ onOpenBilling }) => {
  return (
    <Link to="/EmployeeProducts"className="bg-[#050505] rounded-[32px] p-8 flex flex-col justify-between min-h-[300px] w-full max-w-sm relative overflow-hidden group">

      <div className="self-end bg-[#1a1a1a] p-4 rounded-2xl text-white group-hover:scale-110 transition-transform">
        <ShoppingCart size={28} />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-black text-white leading-tight text-right">
          إضافة فاتورة جديدة
        </h2>
        <p className="text-slate-500 font-bold text-sm text-right leading-relaxed">
          ابدأ عملية بيع جديدة بسرعة فائقة مع نظام المسح الذكي.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <MyButton
        title={' افتح شاشة البيع'}
          onClick={onOpenBilling}
          className="bg-white text-black font-black py-4 px-10 rounded-full text-sm hover:bg-slate-200 transition-colors shadow-lg"
        />
              </div>
    </Link>
  );
};

export default NewInvoiceCard;