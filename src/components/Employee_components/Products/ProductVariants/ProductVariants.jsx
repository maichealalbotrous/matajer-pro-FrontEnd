import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Info, Search, X, ShoppingCart } from 'lucide-react';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { filterVariantsserver, getVariantsserver } from '@/components/Admin_component/Products/ProductVariantsPage/lib';

const ProductVariants = ({ addToInvoice }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedSizeVariant, setSelectedSizeVariant] = useState(null);
  const [parentVariant, setParentVariant] = useState(null);
  const [saleDetails, setSaleDetails] = useState({
    quantity: 1,

    sold_at_price: '',

    item_notes: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // 💡 UI-only state: controls whether the invoice/cart panel is open on mobile.
  // This does not affect any business logic — purely presentational.
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // 💡 تفصيل (Debounce) ناعم لمنع استهلاك ريكويستات السيرفر أثناء الكتابة السريعة

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400); // إرسال الطلب بعد 400 ملي ثانية من التوقف عن الكتابة

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 💡 تحديث الجلب المباشر ليشمل كلاً من معرّف المنتج والكلمة المفتاحية للبحث

// 💡 تحديث الجلب المباشر ليشمل كلاً من معرّف المنتج والكلمة المفتاحية للبحث بشكل منفصل وآمن
  useEffect(() => {
    const fetchLiveVariants = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        let data = [];

        // إذا كتب المستخدم نصاً، نتوجه لدالة الفلترة الخاصة بالـ POST
        if (debouncedQuery.trim() !== '') {
          const backendFilters = {
            product_id: Number(productId),
            search: debouncedQuery.trim(),
            query: debouncedQuery.trim() // احتياطي للمطابقة
          };
          data = await filterVariantsserver(backendFilters);
        } else {
          // 🌟 الحل هنا: إذا كان البحث فارغاً، نرسل الرقم مجرداً للدالة لكي تضعه بداخل الـ GET params بشكل صحيح
          data = await getVariantsserver(Number(productId));
        }

        setVariants(data);
      } catch (err) {
        console.error('خطأ جلب البيانات:', err);
        setVariants([]); // تفريغ المصفوفة عند حدوث خطأ حتى لا تظهر بيانات قديمة
        setErrorMessage(
          err.message ||
            err.error ||
            'فشل الاتصال بالسيرفر لجلب الموديلات المطابقة.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchLiveVariants();
    }
  }, [productId, debouncedQuery]); // يتم إعادة الاستدعاء تلقائياً عند تغيير المنتج أو كلمة البحث

  const handleSelectSize = (parent, sizeObj) => {
    setSelectedSizeVariant(sizeObj);

    setParentVariant(parent);

    setSaleDetails({
      quantity: 1,

      sold_at_price:
        sizeObj.selling_price_withDiscounts ||
        sizeObj.original_price ||
        parent.selling_price_withDiscounts,

      item_notes: '',
    });

    // 💡 UI-only: على الموبايل، افتح لوحة الفاتورة تلقائياً بعد اختيار المقاس
    setIsMobileCartOpen(true);
  };

  const handleConfirmAddition = () => {
    setErrorMessage('');

    if (!selectedSizeVariant) {
      setErrorMessage(
        'يرجى اختيار المقاس واللون المطلوب أولاً من القائمة الكلية.'
      );

      return;
    }

    if (!saleDetails.sold_at_price || Number(saleDetails.sold_at_price) <= 0) {
      setErrorMessage('يرجى تحديد سعر بيع فعلي صحيح للقطعة.');

      return;
    }

    if (Number(saleDetails.quantity) > selectedSizeVariant.quantity) {
      setErrorMessage(
        `الكمية المطلوبة تتجاوز المتاح في المخزن الحالي (${selectedSizeVariant.quantity} قطعة متوفرة فقط).`
      );

      return;
    }

    const newItem = {
      variant_id: selectedSizeVariant.id,
      variant_name: `${parentVariant.variant_name || ''} `,
      sku: selectedSizeVariant.sku,
      size: selectedSizeVariant.size,
      quantity: parseInt(saleDetails.quantity) || 1,
      sold_at_price: parseFloat(saleDetails.sold_at_price),
      item_notes: saleDetails.item_notes || "",
    };

    addToInvoice(newItem);
    setSaleDetails({ quantity: 1, sold_at_price: '', item_notes: '' });
    setSelectedSizeVariant(null);
    setParentVariant(null);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);

    // 💡 UI-only: أغلق لوحة الموبايل بعد نجاح الإضافة
    setIsMobileCartOpen(false);
  };

  // 💡 محتوى لوحة تفاصيل البيع — تم استخراجه كدالة عرض لإعادة استخدامه
  // في كل من اللوحة الثابتة على الديسكتوب واللوحة المنبثقة على الموبايل،
  // دون تكرار الكود أو المساس بأي منطق برمجي.
  const renderInvoicePanelContent = () => (
    <>
      <div className="flex items-center gap-3 mb-8 text-right justify-start">
        <div className="w-10 h-10 bg-[#3198c1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#3198c1]/20">
          <Info size={20} />
        </div>

        <div>
          <h2 className="text-xl font-black">تفاصيل البيع الفعلي</h2>

          {selectedSizeVariant && (
            <p className="text-xs text-slate-400 mt-1 font-bold">
              المختار: {selectedSizeVariant.sku} (
              {selectedSizeVariant.size})
            </p>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-2xl text-right animate-in fade-in">
          ⚠️ {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        <MyInput
          LabelTitle={'سعر البيع الفعلي (للقطعة)'}
          type="number"
          className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 font-black text-right"
          value={saleDetails.sold_at_price}
          onChange={(e) =>
            setSaleDetails({
              ...saleDetails,
              sold_at_price: e.target.value,
            })
          }
        />

        <MyInput
          LabelTitle={'الكمية المطلوبة'}
          type="number"
          className="bg-white/5 border-white/10 text-white font-black text-right"
          value={saleDetails.quantity}
          onChange={(e) =>
            setSaleDetails({ ...saleDetails, quantity: e.target.value })
          }
        />

        {/* <div className="flex flex-col gap-2 text-right">
          <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-wider">
            ملاحظات البند
          </label>

          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1]/50 transition-all min-h-[100px] text-right text-white placeholder:text-slate-600"
            placeholder="ملاحظات حول هذا الصنف بالتحديد..."
            value={saleDetails.item_notes}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails,
                item_notes: e.target.value,
              })
            }
          />
        </div> */}

        <MyButton
          title="إضافة للفاتورة الحالية"
          onClick={handleConfirmAddition}
          className="w-full py-5 bg-[#3198c1] hover:bg-[#2a84a8] text-white rounded-2xl shadow-xl font-black transition-all active:scale-[0.98]"
        />
      </div>
    </>
  );

  return (
    <div className="p-6 sm:p-10 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <SuccessAlert
        isVisible={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
      />
      {/* Header */}

      <div className="flex items-center gap-6 mb-12">
        <button
          onClick={() => navigate(-1)}
          className="p-4 bg-white rounded-[20px] shadow-sm hover:bg-slate-50 transition-all text-[#0f172a]"
        >
          <ChevronRight size={24} />
        </button>

        <div className="text-right">
          <h1 className="text-3xl font-black text-[#0f172a]">
            تخصيص بنود الفاتورة
          </h1>

          <p className="text-slate-400 font-bold mt-1">
            المنتج الرئيسي: {variants[0]?.product || `رقم #${productId}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* الجزء الأيمن: القائمة وحقل البحث الجديد */}
        <div className="lg:col-span-7 space-y-6 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mr-2">
            <h2 className="text-lg font-black text-slate-500">
              الموديلات والأحجام المتوفرة بالمخزن
            </h2>

            {/* 💡 شريط البحث الجديد الفاخر */}

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="ابحث برقم الـ SKU، المقاس أو اللون..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-3 pr-11 pl-4 text-xs font-bold outline-none focus:border-[#3198c1] focus:ring-4 focus:ring-[#3198c1]/10 transition-all text-slate-700 placeholder:text-slate-400"
              />

              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              Array(2)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[32px] bg-white border border-slate-100 h-36 animate-pulse"
                  />
                ))
            ) : variants.length > 0 ? (
              variants.map((v) => (
                <div
                  key={v.id}
                  className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <div className="flex flex-col items-start gap-2 max-w-full text-right">
                      {/* اسم الموديل يلتف تلقائياً لأسفل إذا كان طويلاً جداً */}
                      <span className="font-black text-lg text-[#0f172a] block whitespace-normal break-words leading-relaxed">
                        {v.variant_name}
                      </span>

                      {/* عرض اللون على شكل دائرة ملونة احترافية بدلاً من النص الصريح */}
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full mt-1">
                        <span className="text-slate-500 text-xs font-black">اللون:</span>
                        <span 
                          className="w-4 h-4 rounded-full border border-slate-300 shadow-sm inline-block"
                          style={{ backgroundColor: v.color }} 
                          title={v.color} // تظهر اسم اللون أو كوده عند تمرير الماوس فوق الدائرة
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {v.sizes?.map((sizeObj) => {
                      const isSizeSelected =
                        selectedSizeVariant?.id === sizeObj.id;

                      return (
                        <div
                          key={sizeObj.id}
                          onClick={() => handleSelectSize(v, sizeObj)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between text-right gap-2

                            ${
                              isSizeSelected
                                ? 'border-[#3198c1] bg-blue-50/20 shadow-sm'
                                : 'border-slate-100 hover:border-slate-200 bg-[#fcfcfc]'
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm text-[#0f172a]">
                              القياس:{' '}
                              <span className="text-base font-mono text-[#3198c1]">
                                {sizeObj.size.toUpperCase()}
                              </span>
                            </span>

                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-md ${sizeObj.quantity > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
                            >
                              المخزن: {sizeObj.quantity} قطع
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs text-slate-400">
                            <span>كود: {sizeObj.sku}</span>

                            <span className="font-bold text-[#0f172a]">
                              {Number(
                                sizeObj.selling_price_withDiscounts
                              ).toLocaleString()}{' '}
                              ل.س
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-400 font-bold bg-white rounded-[40px] border border-dashed border-slate-200">
                {debouncedQuery
                  ? 'لا توجد نتائج مطابقة لبحثك الحالي.'
                  : 'لا توجد ألوان أو قياسات معرّفة لهذا المنتج حالياً.'}
              </div>
            )}
          </div>
        </div>

        {/* الجزء الأيسر: سلة تفاصيل البيع والتعميد — تظهر ثابتة فقط على الديسكتوب */}

        <div className="hidden lg:block lg:col-span-5">
          <div className="bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-10 border border-white/5">
            {renderInvoicePanelContent()}
          </div>
        </div>
      </div>

      {/* 💡 زر عائم لفتح الفاتورة على شاشات الموبايل فقط — يحل محل الفاتورة الطويلة أسفل الصفحة */}
      <button
        onClick={() => setIsMobileCartOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#050b1a] text-white px-6 py-4 rounded-full shadow-2xl shadow-black/30 border border-white/10 font-black text-sm active:scale-95 transition-all"
      >
        <ShoppingCart size={18} className="text-[#3198c1]" />
        عرض الفاتورة
        {selectedSizeVariant && (
          <span className="w-5 h-5 flex items-center justify-center bg-[#3198c1] text-white text-[10px] rounded-full font-black">
            1
          </span>
        )}
      </button>

      {/* 💡 لوحة الفاتورة المنبثقة من الأسفل (Bottom Sheet) — للموبايل فقط */}
      {isMobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* خلفية معتمة قابلة للنقر لإغلاق اللوحة */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsMobileCartOpen(false)}
          />

          <div className="absolute bottom-0 inset-x-0 max-h-[88vh] flex flex-col bg-[#050b1a] text-white rounded-t-[32px] shadow-2xl border-t border-white/10 animate-in slide-in-from-bottom duration-300">
            {/* مقبض السحب + زر الإغلاق */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
              <button
                onClick={() => setIsMobileCartOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-all text-slate-400"
              >
                <X size={18} />
              </button>

              <div className="w-10 h-1.5 rounded-full bg-white/15" />

              <div className="w-8" />
            </div>

            <div className="overflow-y-auto px-6 pb-8 pt-2">
              {renderInvoicePanelContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;