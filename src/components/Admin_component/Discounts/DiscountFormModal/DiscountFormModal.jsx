import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const DiscountFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, loading, error, isEditMode }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl overflow-hidden" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-xl font-black text-[#0f172a] mb-6">
            {isEditMode ? "تعديل قاعدة الخصم" : "إضافة قاعدة خصم جديدة"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 text-right">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <MyInput 
            label="معرف المنتج الأساسي (ID)" 
            placeholder="أدخل معرف المنتج من المخزن"
            type="number"
            value={formData.product_id}
            onChange={(e) => setFormData({...formData, product_id: e.target.value})}
            required 
            disabled={isEditMode || loading} // يمنع تغيير رقم المنتج أثناء التعديل
          />
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2 text-right">
              <label className="text-xs font-black text-slate-500">نوع الخصم</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] transition-all"
                value={formData.discount_type}
                onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                disabled={loading}
              >
                <option value="percentage">نسبة مئوية (%)</option>
                <option value="fixed">مبلغ ثابت (ر.س)</option>
              </select>
            </div>
         
            <MyInput 
              label="قيمة الخصم" 
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.discount_value}
              onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
              required 
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MyInput 
              label="تاريخ البدء"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              required 
              disabled={loading}
            />
            <MyInput 
              label="تاريخ الانتهاء"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              required 
              disabled={loading}
            />
          </div>

          {isEditMode && (
            <div className="flex items-center gap-2 pt-2 text-right">
              <input 
                type="checkbox" 
                id="is_active" 
                className="w-4 h-4 rounded text-[#3198c1] focus:ring-[#3198c1]"
                checked={formData.is_active} 
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                disabled={loading}
              />
              <label htmlFor="is_active" className="text-xs font-black text-[#0f172a]">تفعيل العرض حالياً</label>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <MyButton 
              title={loading ? "جاري الحفظ..." : "حفظ الخصم"} 
              type="submit" 
              disabled={loading}
              className="p-3 flex-1 bg-[#3198c1] hover:bg-[#257393] text-white font-black rounded-2xl transition-all" 
            />
            <MyButton 
              title="إلغاء" 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              className="flex-1 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-2xl transition-all" 
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountFormModal;