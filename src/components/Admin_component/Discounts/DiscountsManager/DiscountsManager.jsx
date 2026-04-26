import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DiscountsStatsCard from '../DiscountsStatsCard/DiscountsStatsCard';
import DiscountsTable from '../DiscountsTable/DiscountsTable';
import DiscountFormModal from '../DiscountFormModal/DiscountFormModal';
import MyButton from '@/components/MyButton/MyButton';
import {discountsData} from './lib'
const DiscountsManager = () => {
  const [discounts, SetDiscounts] = useState(discountsData);
  const [loading, SetLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    discount_type: 'percentage',
    discount_value: '',
    start_date: '',
    end_date: ''
  });


const handleEdit = (discount) => {
  setFormData({
    id: discount.id,
    product_id: discount.product_id,
    discount_type: discount.discount_type,
    discount_value: discount.discount_value,
    start_date: discount.start_date,
    end_date: discount.end_date
  });
  setIsModalOpen(true);
};



  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">إدارة الخصومات</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">العروض النشطة والجدولة الزمنية</p>
        </div>
           <div 
              className="flex w-fit m-11 items-center gap-2 bg-[#050b1a] text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-black transition-all shadow-sm" 
              onClick={()=>setIsModalOpen(true)}
            >
              <Plus size={18} />
              <span className="text-sm font-black"> اضافة خصم </span>
            </div>
      </div>

      <DiscountsTable 
        data={discounts} 
        loading={loading} 
        onEdit={handleEdit} 
      />

      
      <DiscountFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onSubmit={handleAddDiscount}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default DiscountsManager;