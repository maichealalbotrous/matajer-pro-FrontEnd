import React from 'react';
import { ShoppingCart } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';

const NewInvoiceCard = ({ onOpenBilling }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/EmployeeProducts');
    if (onOpenBilling) onOpenBilling();
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-[#050505] rounded-[32px] p-8 flex flex-col justify-between min-h-[310px] w-full max-w-sm relative overflow-hidden group border border-white/5 transition-all duration-300 shadow-xl cursor-pointer hover:scale-[1.01] text-right"
    >
      {/* الرمز الصوري الأيمن العلوي */}
      <div className="self-end bg-[#1a1a1a] text-white p-4 rounded-2xl group-hover:scale-110 transition-transform">
        <ShoppingCart size={28} />
      </div>

      {/* النصوص الوصفية للكرت */}
      <div className="space-y-4 mt-4">
        <h2 className="text-3xl font-black text-white leading-tight">
          إضافة فاتورة جديدة
        </h2>
        <p className="text-slate-500 font-bold text-sm leading-relaxed">
          ابدأ عملية بيع جديدة بسرعة فائقة مع نظام المسح وتخصيص الأسعار الذكي.
        </p>
      </div>

      {/* زر الانتقال السفلي */}
      <div className="mt-6 flex justify-end">
        <MyButton
          title="افتح شاشة البيع"
          onClick={(e) => {
            e.stopPropagation(); 
            handleNavigate();
          }}
          className="bg-white text-black font-black py-4 px-10 rounded-full text-sm hover:bg-slate-200 transition-colors shadow-lg"
        />
      </div>
    </div>
  );
};

export default NewInvoiceCard;