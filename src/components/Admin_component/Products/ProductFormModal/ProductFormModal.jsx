import React, { useState, useEffect } from 'react';
import { X, Trash2, Save, Plus } from 'lucide-react';
import { addProductToServer, updateProductOnServer, deleteProductFromServer } from '../ProductsManager/lib';
import Public_Alert from '@/components/Public_Alert/Public_Alert'; 
import MyInput from '@/components/MyInput/MyInput';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const ProductFormModal = ({ isOpen, onClose, productToEdit, initialDeleteState = false, onRefresh }) => {
  const [formData, setFormData] = useState({ model_name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Alert state for success messages after add/update/delete operations
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: '', dis: '' });

  const isEditMode = !!productToEdit;

useEffect(() => {
  if (isEditMode) {
    setFormData({
      model_name: productToEdit.product_name || ''
    });
    setShowDeleteConfirm(initialDeleteState);
  } else {
    setFormData({ model_name: '' });
    setShowDeleteConfirm(false); 
  }
  
  setError(null);
}, [productToEdit, isOpen, initialDeleteState]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEditMode) {
        await updateProductOnServer({ id: productToEdit.product_id, ...formData });
        triggerAlert("تم التحديث بنجاح", "تم تعديل اسم المنتج بنجاح في النظام.");
      } else {
        await addProductToServer(formData);
        triggerAlert("تمت الإضافة بنجاح", "تم تسجيل المنتج الجديد بنجاح في المعرض الرئيسي.");
      }
      onRefresh(); 
      onClose();  
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء حفظ البيانات.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteProductFromServer(productToEdit.product_id);
      onRefresh();
      triggerAlert("تم حذف المنتج", "تم إزالة المنتج من النظام نهائياً.");
      onClose();
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء حذف المنتج.");
    } finally {
      setLoading(false);
    }
  };

  const triggerAlert = (title, description) => {
    setAlertData({ title, dis: description });
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  if (!isOpen && !alertVisible) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" dir="rtl">
          
          <div className={`w-full max-w-md p-8 shadow-2xl flex flex-col relative overflow-hidden transition-all duration-300
            ${showDeleteConfirm ? 'bg-[#050b1a] text-white rounded-[24px]' : 'bg-white rounded-[32px] border border-slate-100'}`}
              >
                  
                  <button 
                    type="button" 
                    onClick={onClose} 
                    className={`absolute top-6 left-6 p-2 rounded-xl transition-all 
                      ${showDeleteConfirm ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                  >
                    <X size={18} />
                  </button>

                  {showDeleteConfirm ? (
                    <DeleteConfirmView
                title="هل أنت متأكد من الحذف؟"
                description={
                  <>
                    سيتم حذف هذا المنتج وموديلاته نهائياً من النظام، <span className="text-red-400 font-black">ولا يمكن التراجع</span> عن هذا الإجراء الإداري.
                  </>
          }
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isDeleting={loading}
        />
            ) : (
              /* واجهة الإدخال والتعديل البيضاء الأساسية */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-[#0f172a]">
                    {isEditMode ? "تعديل بيانات المنتج" : "إضافة منتج جديد"}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold mt-1">يرجى إدخال اسم المنتج بدقة لتحديث المعرض.</p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-[#0f172a]">اسم المنتج</label>
                    <MyInput
                      type="text"
                      required
                      value={formData.model_name}
                      onChange={(e) => setFormData({ model_name: e.target.value })}
                      placeholder="مثال: بنطلون جينز أزرق"
                      className="w-full px-4 py-3.5 bg-slate-50 text-[#0f172a] rounded-2xl border border-transparent font-bold text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-[#0f172a] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#1e293b] disabled:opacity-50 transition-all">
                    {isEditMode ? <Save size={16} /> : <Plus size={16} />}
                    {loading ? "جاري الحفظ..." : isEditMode ? "حفظ التعديلات" : "إضافة إلى المعرض"}
                  </button>

                  {isEditMode && (
                    <button type="button" onClick={() => setShowDeleteConfirm(true)} className="p-3.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl transition-all" title="حذف المنتج">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* مكون الإشعار العائم عند اكتمال العمليات بنجاح */}
      <Public_Alert 
        isVisible={alertVisible} 
        title={alertData.title} 
        dis={alertData.dis} 
      />
    </>
  );
};

export default ProductFormModal;