import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DiscountsTable from '../DiscountsTable/DiscountsTable';
import DiscountFormModal from '../DiscountFormModal/DiscountFormModal';
import { discountsData } from './lib';

const DiscountsManager = () => {
  const [discounts, setDiscounts] = useState(discountsData);
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

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الخصم؟")) {
      setDiscounts(discounts.filter(d => d.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الخصومات</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">العروض النشطة والجدولة الزمنية</p>
        </div>
        <button 
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#050b1a] text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-black transition-all shadow-sm" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span className="text-sm font-black">إضافة خصم</span>
        </button>
      </div>

      <DiscountsTable 
        data={discounts} 
        loading={loading} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <DiscountFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default DiscountsManager;