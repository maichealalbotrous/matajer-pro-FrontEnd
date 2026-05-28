import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DiscountsTable from '../DiscountsTable/DiscountsTable';
import DiscountFormModal from '../DiscountFormModal/DiscountFormModal';
import Public_Alert from '@/components/Public_Alert/Public_Alert';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

import { addDiscountToServer, deleteDiscountFromServer, getDiscountsFromServer, updateDiscountOnServer } from './lib';

const DiscountsManager = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);

  // التحكم بالمودالات
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

  const [formData, setFormData] = useState({
    product_id: '',
    discount_type: 'percentage',
    discount_value: '',
    start_date: '',
    end_date: '',
    is_active: true
  });

  const isEditMode = !!formData.id;

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      const data = await getDiscountsFromServer();
      setDiscounts(data);
      setError(null);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تحميل الخصومات من السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscounts();
  }, []);

  const triggerAlert = (title, dis) => {
    setAlertConfig({ isVisible: true, title, dis });
    setTimeout(() => {
      setAlertConfig({ isVisible: false, title: "", dis: "" });
    }, 2500);
  };

  const handleOpenAdd = () => {
    setModalError(null);
    setFormData({
      product_id: '',
      discount_type: 'percentage',
      discount_value: '',
      start_date: '',
      end_date: '',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (discount) => {
    setModalError(null);
    setFormData({
      id: discount.id,
      product_id: discount.product_id,
      discount_type: discount.discount_type,
      discount_value: discount.discount_value,
      start_date: discount.start_date,
      end_date: discount.end_date,
      is_active: Boolean(discount.is_active)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setModalError(null);

    try {
      if (isEditMode) {
        await updateDiscountOnServer(formData);
        triggerAlert("تم تعديل الخصم", "تم تحديث شروط ومواعيد الخصم في النظام بنجاح.");
      } else {
        await addDiscountToServer(formData);
        triggerAlert("تم تفعيل الخصم", "تم إدراج العرض الجديد للمنتج .");
      }
      setIsModalOpen(false);
      loadDiscounts();
    } catch (err) {
      setModalError(err.error || err.message || "فشلت العملية، يرجى مراجعة البيانات.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteDiscountFromServer(deleteTargetId); 
      triggerAlert("تم حذف قاعدة الخصم", "تمت إزالة العرض الترويجي والعودة للأسعار الافتراضية.");
      setIsDeleteOpen(false);
      loadDiscounts();
    } catch (err) {
      alert(err.message || "فشل حذف قاعدة الخصم");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6" dir="rtl">
      {/* الإشعار العائم العلوي */}
      <Public_Alert isVisible={alertConfig.isVisible} title={alertConfig.title} dis={alertConfig.dis} />

      {/* مودال تأكيد الحذف الداكن الموحد */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-8 bg-[#050b1a] border-none text-white rounded-[24px]">
          <DeleteConfirmView 
            title="حذف قاعدة الخصم"
            description="هل أنت متأكد من إلغاء قاعدة الخصم الحالية؟ سيؤدي ذلك لعودة جميع موديلات المنتج ومقاساته لأسعارها الأصلية فوراً."
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteOpen(false)}
            isDeleting={actionLoading}
          />
        </DialogContent>
      </Dialog>

      {/* الهيدر العلوي */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الخصومات</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">العروض النشطة والجدولة الزمنية للفرع</p>
        </div>
        <button 
          className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#050b1a] text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-black transition-all shadow-sm" 
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          <span className="text-sm font-black">إضافة خصم</span>
        </button>
      </div>

      {error ? (
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[25px] border border-red-100 font-bold">
          {error}
        </div>
      ) : (
        <DiscountsTable 
          data={discounts} 
          loading={loading} 
          onEdit={handleEdit}
          onDelete={handleOpenDelete}
        />
      )}
      
      <DiscountFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        loading={actionLoading}
        error={modalError}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default DiscountsManager;