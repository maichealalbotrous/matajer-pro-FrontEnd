import React, { useState } from 'react';
import { Trash2, Edit3, X } from 'lucide-react';
import { deleteVariantFromServer } from '../ProductVariantsPage/lib';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const VariantCard = ({ group, onEdit, onRefresh, onShowAlert }) => {
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAllSizes = async () => {
    setDeleting(true);
    try {
      for (const sizeItem of group.sizes) {
        await deleteVariantFromServer(sizeItem.id);
      }
      
      onShowAlert(
        "تم الحذف بنجاح", 
        `تم إزالة كافة المقاسات المرتبطة بالموديل ${group.variant_name} من النظام.`
      );
      
      onRefresh(); 
    } catch (err) {
      onShowAlert(
        "فشلت عملية الحذف", 
        err.message || "حدث خطأ غير متوقع أثناء محاولة حذف المقاسات."
      );
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div 
      className={`border rounded-[30px] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]
        ${showDeleteConfirm ? 'bg-[#050b1a] border-transparent text-white' : 'bg-white border-slate-100 text-[#0f172a]'}`}
      dir="rtl"
    >
      
      {showDeleteConfirm ? (
        <DeleteConfirmView 
          title="هل أنت متأكد من الحذف؟"
          description={
            <>
              سيتم حذف موديل <span className="text-white">({group.variant_name})</span> بجميع مقاساته وكمياته نهائياً من المخزن ولا يمكن التراجع.
            </>
          }
          onConfirm={handleDeleteAllSizes}
          onCancel={() => setShowDeleteConfirm(false)}
          isDeleting={deleting}
        />
      ) : (
        /* واجهة عرض الموديل الأساسية */
        <>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h4 className="font-black text-[#0f172a] text-lg leading-tight">{group.variant_name}</h4>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" 
                    style={{ backgroundColor: group.color || '#ccc' }}
                  ></div>
                  <span className="text-xs font-bold text-slate-400">{group.color || "غير محدد"}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black border border-slate-100">
                {group.sizes?.[0]?.sku?.split('-')[0] || 'N/A'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {group.sizes?.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase">{s.size}</span>
                  <span className="text-xs font-black text-[#0f172a]">{s.quantity} قطعة</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-slate-100 flex justify-between items-center mt-auto">
            <div>
              <p className="text-[10px] font-bold text-slate-400">
                {group.selling_price_withDiscounts !== null ? "سعر البيع بعد الخصم" : "سعر البيع"}
              </p>
              <div className="flex items-baseline gap-1.5">
                <p className="font-black text-green-600 text-base">{group.selling_price_withDiscounts} ل.س</p>
                {Number(group.original_price) > Number(group.selling_price_withDiscounts) && (
                  <p className="text-xs text-slate-300 line-through font-bold">{group.original_price}</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-1">
              <button 
                onClick={onEdit} 
                className="p-2.5 text-slate-600 hover:text-[#0f172a] hover:bg-slate-50 rounded-xl font-black text-xs transition-all flex items-center gap-1"
              >
                <Edit3 size={14} />
                تعديل
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="حذف الموديل"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VariantCard;