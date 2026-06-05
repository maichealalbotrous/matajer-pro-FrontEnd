import React, { useState, useEffect } from 'react';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { storePaymentServer, updatePaymentServer } from '../PaymentsManager/lib';

const PaymentDialog = ({ isOpen, onClose, payment, branchId, onSuccess }) => {
  // 1. تعريف الـ State الافتراضية مع جعل الـ branch_id حقل قابل للإدخال اليدوي والتعيير
  const [formData, setFormData] = useState({
    id:'',
    branch_id: branchId || '', // سيقوم المستخدم بكتابته يدوياً
    amount_paid: '',
    currency: 'SAR',
    payment_method: '',
    reference_number: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. مزامنة الحقول عند فتح النافذة
  useEffect(() => {
    if (isOpen) {
      if (payment) {
        // في حال التعديل
        setFormData({
          id: payment.id || '',
          branch_id: payment.branch_id || '',
          amount_paid: payment.amount_paid || '',
          currency: payment.currency || 'SAR',
          payment_method: payment.payment_method || '',
          reference_number: payment.reference_number || ''
        });
      } else {
        // في حال إضافة جديدة: نترك الحقل فارغاً ليقوم المستخدم بكتابته يدوياً
        setFormData({
          id:'',
          branch_id: '', 
          amount_paid: '',
          currency: 'SAR',
          payment_method: '',
          reference_number: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, payment]);

  if (!isOpen) return null;

  // 3. دالة الإرسال للسيرفر
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      let res;
      if (payment) {
        res = await updatePaymentServer( formData);
      } else {
        // إرسال البيانات والـ branch_id الذي تم إدخاله يدوياً في الفورم
        res = await storePaymentServer(formData);
      }

      if (res.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.message || 'حدث خطأ ما أثناء حفظ البيانات' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-md rounded-[32px] border border-slate-100 shadow-2xl overflow-hidden p-6 relative">
        
        <div className="mb-6">
          <h3 className="text-lg font-black text-[#0f172a]">
            {payment ? 'تعديل السجل المالي' : 'تسجيل دفعة مالية جديدة'}
          </h3>
        </div>

        {errors.general && (
          <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl mb-4 text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* [التعديل المطلوب]: حقل إدخال يدوي لمعرف الفرع (branch_id) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">رقم / معرف الفرع *</label>
            <MyInput
              type="number"
              placeholder="أدخل رقم الفرع (مثال: 1, 2, 3)"
              required
              value={formData.branch_id}
              onChange={(e) => setFormData({ ...formData, branch_id: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl outline-none text-sm font-bold"
            />
            {errors.branch_id && <span className="text-[10px] text-red-500 font-bold mr-1">{errors.branch_id[0]}</span>}
          </div>

          {/* حقل المبلغ المدفوع */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">المبلغ المدفوع *</label>
            <MyInput
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              value={formData.amount_paid}
              onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl outline-none text-sm font-bold"
            />
            {errors.amount_paid && <span className="text-[10px] text-red-500 font-bold mr-1">{errors.amount_paid[0]}</span>}
          </div>

          {/* حقل العملة وطريقة الدفع */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">العملة *</label>
              <MyInput
                type="text"
                placeholder="SAR"
                maxLength={3}
                required
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl outline-none text-sm uppercase font-bold"
              />
              {errors.currency && <span className="text-[10px] text-red-500 font-bold mr-1">{errors.currency[0]}</span>}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">طريقة الدفع *</label>
              <MyInput
                type="text"
                placeholder="مدى، كاش..."
                required
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl outline-none text-sm font-bold"
              />
              {errors.payment_method && <span className="text-[10px] text-red-500 font-bold mr-1">{errors.payment_method[0]}</span>}
            </div>
          </div>

          {/* حقل الرقم المرجعي */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">الرقم المرجعي (اختياري)</label>
            <MyInput
              type="text"
              placeholder="أدخل الرقم المرجعي"
              value={formData.reference_number}
              onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
              className="w-full px-4 py-2.5 border rounded-xl outline-none text-sm"
            />
            {errors.reference_number && <span className="text-[10px] text-red-500 font-bold mr-1">{errors.reference_number[0]}</span>}
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-50 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-600 rounded-xl font-bold text-xs"
            >
              إلغاء
            </button>
            <MyButton
              title={isSubmitting ? "جاري الحفظ..." : (payment ? "تحديث" : "تسجيل الدفعة")}
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default PaymentDialog;