import React, { useState, useEffect, useRef } from 'react';
import { Save, Trash2, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addVariantToServer, deleteVariantFromServer, updateVariantOnServer } from '../ProductVariantsPage/lib';

const VariantFormDialog = ({ isOpen, onClose, productId, editGroup, onSaveSuccess }) => {
  const isEditMode = !!editGroup;

  const [variantName, setVariantName] = useState("");
  const [color, setColor] = useState("#000000");
  // ✅ هذه الحقول الثلاثة أصبحت على مستوى الموديل/اللون بأكمله، لأن الباك إند
  // (colors_groups.*.cost_price / selling_price / sku) يطلبها هيك بالضبط، وليس
  // داخل كل مقاس على حدة — الباك إند نفسه يولّد SKU فريد لكل مقاس تلقائياً
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [sku, setSku] = useState("");
  const [sizes, setSizes] = useState([{ size: "M", quantity: 0 }]);
  const [loading, setLoading] = useState(false);
  const [DeletedIds, setDeletedIds] = useState([]);

  // 🛠️ نتتبع هنا آخر حالة لـ isOpen، حتى نعرف متى تم فتح الديالوج "فعلياً"
  // (انتقال من مغلق إلى مفتوح) بدلاً من أي إعادة رندر أخرى أثناء بقائه مفتوحاً
  const prevIsOpenRef = useRef(false);

  useEffect(() => {
    const justOpened = isOpen && !prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    // 🛑 لا تعيد تعبئة الفورم إلا عند الفتح الفعلي فقط (وليس عند أي تغيّر في
    // مرجع editGroup أثناء بقاء الديالوج مفتوحاً)، وهذا هو ما كان يسبب عودة
    // ظهور المقاسات المحذوفة عند الضغط على "حفظ"
    if (!justOpened) return;

    setDeletedIds([]);
    if (isEditMode) {
      setVariantName(editGroup.variant_name || "");

      setColor(editGroup.color || "#000000"); // ✅ لون افتراضي أسود إذا القيمة القادمة من السيرفر فاضية
      console.log("Sizes from API:", editGroup.sizes);

      // ✅ نأخذ سعر التكلفة وسعر البيع من أول مقاس موجود (لأن كل مقاسات نفس
      // الموديل/اللون تشترك بنفس السعر أساساً حسب تصميم الباك إند)
      const firstSize = editGroup.sizes?.[0];
      setCostPrice(firstSize?.cost_price ?? "");
      setSellingPrice(
        firstSize?.original_price ?? firstSize?.selling_price_withDiscounts ?? ""
      );
      // ✅ الـ SKU المخزن لكل مقاس هو SKU فريد مولّد بالشكل "base-size-xxxx"،
      // فنستخرج منه الجزء الأساسي (base) قبل أول "-" لعرضه كـ SKU الموديل
      const rawSku = firstSize?.sku || "";
      setSku(rawSku.includes('-') ? rawSku.split('-')[0] : rawSku);

      setSizes(
        editGroup.sizes?.map(s => ({
          id: s.id,
          size: s.size,
          quantity: s.quantity,
        })) || []
      );
    } else {
      setVariantName("");
      setColor("#000000");
      setCostPrice("");
      setSellingPrice("");
      setSku("");
      setSizes([{ size: "M", quantity: 0 }]);
    }
  }, [isOpen, editGroup, isEditMode]);

  const handleAddSizeRow = () => {
setSizes([
      ...sizes, 
      { 
        size: "", 
        quantity: 0, 
        cost_price: costPrice !== "" ? Number(costPrice) : 0, 
        selling_price: sellingPrice !== "" ? Number(sellingPrice) : 0 
      }
    ]);  };

const handleRemoveSizeRow = async (index) => {
    const sizeToDelete = sizes[index];

    // إذا كان المقاس مخزناً مسبقاً في قاعدة البيانات وله ID، نقوم بحذفه عبر دالة الباك إند المستقلة
    if (sizeToDelete && sizeToDelete.id) {
      try {
        setLoading(true);
        // استدعاء دالة الحذف المستقلة الموجودة لديك
        await deleteVariantFromServer(sizeToDelete.id);
      } catch (error) {
        console.error("فشل حذف المقاس:", error);
        alert(error.error || error.message || "حدث خطأ أثناء حذف المقاس");
        setLoading(false);
        return; // إيقاف الحذف من الواجهة إذا فشل الحذف في السيرفر
      } finally {
        setLoading(false);
      }
    }

    // حذف السطر من الواجهة المحلية فقط بعد نجاح الحذف أو إذا كان عنصراً جديداً محلياً
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let cleanSku = sku;
      if (cleanSku && cleanSku.includes('-')) {
        cleanSku = cleanSku.split('-')[0];
      }

      const colorsGroups = [
        {
          variant_name: variantName,
          color: color || "#000000", // ✅ لون افتراضي أسود إذا لم يُدخل المستخدم شيئاً
          cost_price: costPrice !== "" ? Number(costPrice) : 0,
          selling_price: sellingPrice !== "" ? Number(sellingPrice) : 0,
          sku: cleanSku || "",
          sizes: sizes.map(s => ({
            id: s.id ? Number(s.id) : null,
            size: s.size,
            quantity: s.quantity !== "" ? Number(s.quantity) : 0,
            cost_price: s.cost_price !== undefined ? Number(s.cost_price) : (costPrice !== "" ? Number(costPrice) : 0),
        selling_price: s.selling_price !== undefined ? Number(s.selling_price) : (sellingPrice !== "" ? Number(sellingPrice) : 0),
          }))
        }
      ];

      if (isEditMode) {
        // إرسال التحديثات العادية فقط بدون أي مصفوفة محذوفات
        await updateVariantOnServer(productId, colorsGroups);
        onSaveSuccess("تم التحديث بنجاح", "تم حفظ تعديلات الموديل والمقاسات.");
      } else {
        await addVariantToServer(productId, colorsGroups);
        onSaveSuccess("تمت الإضافة بنجاح", "تمت إضافة الموديل الجديد بنجاح.");
      }
      onClose();
    } catch (err) {
      console.error("تفاصيل خطأ السيرفر:", err);
      if (err.errors) {
        const errorMessages = Object.values(err.errors).flat().join("\n");
        alert(`فشل التحقق من البيانات:\n${errorMessages}`);
      } else {
        alert(err.message || "حدث خطأ غير متوقع أثناء معالجة الطلب.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white rounded-[30px] p-6 text-right max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="flex justify-between items-start border-b border-dashed border-slate-100 pb-4">
          <DialogTitle className="text-2xl font-black text-[#0f172a]">
            {isEditMode ? `تعديل الموديل: ${editGroup.variant_name}` : "إضافة موديل جديد للمنتج"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/*failed*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-700 text-xs">اسم الموديل / النمط</label>
              <input 
                type="text" required value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
                placeholder="مثال: سويت شيرت صيفي"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-slate-300 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-700 text-xs">اللون</label>
              <div className="flex gap-4 items-center bg-slate-50 border border-slate-100 rounded-xl p-1.5 px-3">
                <input 
                  type="color" value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                />
                <span className="font-bold text-slate-500 uppercase text-xs">{color}</span>
              </div>
            </div>
          </div>

          {/* رقم المنتج والأسعار - على مستوى الموديل/اللون بأكمله */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-dashed border-slate-100">
            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-700 text-xs">رقم المنتج (SKU)</label>
              <input 
                type="text" required value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="sku-black"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 text-sm tracking-wide focus:outline-none focus:border-slate-300 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-700 text-xs">سعر التكلفة</label>
              <input 
                type="number" required step="0.01" value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-slate-300 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-black text-slate-700 text-xs">سعر البيع الأساسي</label>
              <input 
                type="number" required step="0.01" value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-slate-300 transition-all"
              />
            </div>
          </div>

          {/* sizes failed*/}
          <div className="space-y-3 pt-4 border-t border-dashed border-slate-100">
            <div className="flex justify-between items-center">
              <h4 className="font-black text-base text-[#0f172a]">المقاسات وإدارة المخزن</h4>
              <button 
                type="button" onClick={handleAddSizeRow}
                className="flex items-center gap-1 text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all"
              >
                <Plus size={12} /> إضافة مقاس آخر
              </button>
            </div>

            <div className="space-y-2">
              {sizes.map((s, index) => (
        <div key={index} className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group animate-in fade-in duration-150">

          {/* السطر الأول: المقاس والكمية - يمتدان على كامل العرض بالتساوي */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* المقاس */}
            <div className="flex flex-col gap-1">
              <label className="font-black text-slate-400 text-[10px] mr-1 truncate">المقاس</label>
              <input 
                type="text" required placeholder="S, M, XL" value={s.size}
                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200/70 rounded-xl font-bold text-sm text-center text-slate-700 focus:border-[#3198c1] focus:ring-1 focus:ring-[#3198c1] focus:outline-none transition-all"
              />
            </div>

            {/* الكمية */}
            <div className="flex flex-col gap-1">
              <label className="font-black text-slate-400 text-[10px] mr-1 truncate">الكمية</label>
              <input 
                type="number" required min="0" placeholder="0" value={s.quantity}
                onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200/70 rounded-xl font-bold text-sm text-center text-slate-700 focus:border-[#3198c1] focus:ring-1 focus:ring-[#3198c1] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* زر الحذف */}
          {sizes.length > 1 && (
            <div className="flex justify-end">
              <button 
                type="button" onClick={() => handleRemoveSizeRow(index)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="حذف السطر"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}

        </div>
              ))}
            </div>
          </div>

          {/* submit buttons*/}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button 
              type="button" onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-xs hover:bg-slate-200 transition-all"
            >
              إلغاء
            </button>
            <button 
              type="submit" disabled={loading}
              className="flex items-center gap-1 bg-[#0f172a] text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <Save size={14} /> {loading ? "جاري الحفظ..." : isEditMode ? "حفظ التعديلات" : "إضافة الموديل"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VariantFormDialog;