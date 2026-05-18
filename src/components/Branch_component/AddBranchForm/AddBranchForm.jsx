import React, { useState } from 'react';
import { Store, MapPin, Plus } from 'lucide-react';
import { executeBranchCreation } from '../Branches/lib';
import Public_Alert from '@/components/public_Alert/Public_Alert';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';


function AddBranchForm({ onBranchAdded }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    executeBranchCreation({
      formData,
      setIsSubmitting,
      setAlertConfig,
      onSuccess: (newBranchId) => {
        setFormData({ name: '', location: '' });
        if (onBranchAdded) onBranchAdded(newBranchId);
         navigate('/ValidateCode');

      }
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-[35px] shadow-xl shadow-slate-100/70 border border-slate-50" dir="rtl">
      
      <Public_Alert
        isVisible={alertConfig.isVisible}
        title={alertConfig.title}
        dis={alertConfig.description}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
      />

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 bg-[#050b1a] rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-black/10">
          <Store size={26} />
        </div>
        <h2 className="text-2xl font-black text-[#0f172a]">إضافة فرع جديد</h2>
        <p className="text-xs text-slate-400 font-bold mt-1">أدخل بيانات الموقع لربط المنشأة بنظام المبيعات</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 mr-1">اسم الفرع *</label>
          <div className="relative flex items-center">
            <Store className= "  absolute right-1 text-slate-400 w-5 h-5 pointer-events-none z-10" />
            <MyInput
              type="text"
              required
              placeholder="مثال: فرع النخيل مول"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full pr-12 pl-4 py-4 bg-slate-50/70 border-2 border-slate-100 rounded-2xl font-bold text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#3198c1] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* location Input*/}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-500 mr-1">الموقع / العنوان</label>
          <div className="relative flex items-center">
            <MapPin className="absolute right-1 text-slate-400 w-5 h-5 pointer-events-none z-10" />
            <MyInput
              type="text"
              placeholder="مثال: الرياض، مخرج 9"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pr-12 pl-4 py-4 bg-slate-50/70 border-2 border-slate-100 rounded-2xl font-bold text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#3198c1] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/*Add Button*/}
        <MyButton
          type="submit"
          disabled={!formData.name.trim() || isSubmitting}
          className="w-full mt-2 bg-[#050b1a] hover:bg-[#0a1429] text-white rounded-[22px] font-black text-base transition-all active:scale-[0.98] disabled:opacity-40 shadow-xl shadow-black/5 flex items-center justify-center py-4"
          title={
            isSubmitting ? (
              "جاري إنشاء الفرع..."
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Plus size={18} className="stroke-[3]" />
                <span>إنشاء وتأكيد الفرع</span>
              </div>
            )
          }
        />
      </form>
    </div>
  );
}

export default AddBranchForm;