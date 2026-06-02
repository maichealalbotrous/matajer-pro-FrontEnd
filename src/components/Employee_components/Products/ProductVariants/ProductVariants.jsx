import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { getVariantsserver } from '@/components/Admin_component/Products/ProductVariantsPage/lib';

const ProductVariants = ({ addToInvoice }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [variants, setVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedSizeVariant, setSelectedSizeVariant] = useState(null);
  const [parentVariant, setParentVariant] = useState(null);
  
  const [saleDetails, setSaleDetails] = useState({
    quantity: 1,
    sold_at_price: '',
    item_notes: ''
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLiveVariants = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await getVariantsserver({ product_id: Number(productId) });
        setVariants(data);
      } catch (err) {
        console.error("خطأ جلب البيانات:", err);
        setErrorMessage(err.error || err.message || "فشل الاتصال بالسيرفر لجلب الموديلات الحالية.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchLiveVariants();
    }
  }, [productId]);

  const handleSelectSize = (parent, sizeObj) => {
    setSelectedSizeVariant(sizeObj);
    setParentVariant(parent);
    
    setSaleDetails({
      quantity: 1,
      sold_at_price: sizeObj.selling_price_withDiscounts || sizeObj.original_price || parent.selling_price_withDiscounts,
      item_notes: ''
    });
  };

  const handleConfirmAddition = () => {
    setErrorMessage("");

    if (!selectedSizeVariant) {
      setErrorMessage('يرجى اختيار المقاس واللون المطلوب أولاً من القائمة الكلية.');
      return;
    }

    if (!saleDetails.sold_at_price || Number(saleDetails.sold_at_price) <= 0) {
      setErrorMessage('يرجى تحديد سعر بيع فعلي صحيح للقطعة.');
      return;
    }

    if (Number(saleDetails.quantity) > selectedSizeVariant.quantity) {
      setErrorMessage(`الكمية المطلوبة تتجاوز المتاح في المخزن الحالي (${selectedSizeVariant.quantity} قطعة متوفرة فقط).`);
      return;
    }

    const newItem = {
      variant_id: selectedSizeVariant.id,
      // تـصحيح: حـوّلنا الحقل إلى variant_name ليتوافق مع شاشة السلة الحالية
      variant_name: `${parentVariant.variant_name || ''} (${parentVariant.color || ''}) - قياس ${selectedSizeVariant.size}`,
      sku: selectedSizeVariant.sku,
      size: selectedSizeVariant.size,
      quantity: parseInt(saleDetails.quantity) || 1,
      sold_at_price: parseFloat(saleDetails.sold_at_price),
      item_notes: saleDetails.item_notes
    };

    addToInvoice(newItem);

    setSaleDetails({ quantity: 1, sold_at_price: '', item_notes: '' });
    setSelectedSizeVariant(null);
    setParentVariant(null);

    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  };

  return (
    <div className="p-10 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <SuccessAlert isVisible={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} />

      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <button
          onClick={() => navigate(-1)}
          className="p-4 bg-white rounded-[20px] shadow-sm hover:bg-slate-50 transition-all text-[#0f172a]"
        >
          <ChevronRight size={24} />
        </button>
        <div className="text-right">
          <h1 className="text-3xl font-black text-[#0f172a]">تخصيص بنود الفاتورة</h1>
          <p className="text-slate-400 font-bold mt-1">المنتج الرئيسي: {variants[0]?.product || `رقم #${productId}`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-7 space-y-6 text-right">
          <h2 className="text-lg font-black text-slate-500 mr-2">الموديلات والأحجام المتوفرة بالمخزن</h2>
          
          <div className="space-y-6">
            {isLoading ? (
              Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="p-6 rounded-[32px] bg-white border border-slate-100 h-36 animate-pulse" />
              ))
            ) : variants.length > 0 ? (
              variants.map((v) => (
                <div key={v.id} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <div>
                      <span className="font-black text-lg text-[#0f172a]">{v.variant_name}</span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-black px-2.5 py-1 rounded-full mr-2">
                        اللون: {v.color}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {v.sizes?.map((sizeObj) => {
                      const isSizeSelected = selectedSizeVariant?.id === sizeObj.id;
                      return (
                        <div
                          key={sizeObj.id}
                          onClick={() => handleSelectSize(v, sizeObj)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between text-right gap-2
                            ${isSizeSelected 
                              ? 'border-[#3198c1] bg-blue-50/20 shadow-sm' 
                              : 'border-slate-100 hover:border-slate-200 bg-[#fcfcfc]'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-black text-sm text-[#0f172a]">القياس: <span className="text-base font-mono text-[#3198c1]">{sizeObj.size.toUpperCase()}</span></span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${sizeObj.quantity > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                              المخزن: {sizeObj.quantity} قطع
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-slate-400">
                            <span>كود: {sizeObj.sku}</span>
                            <span className="font-bold text-[#0f172a]">{Number(sizeObj.selling_price_withDiscounts).toLocaleString()} ل.س</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-400 font-bold bg-white rounded-[40px] border border-dashed border-slate-200">
                لا توجد ألوان أو قياسات معرّفة لهذا المنتج حالياً.
              </div>
            )}
          </div>
        </div>

        {/* Details of the process */}
        <div className="lg:col-span-5">
          <div className="bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-10 border border-white/5">
            <div className="flex items-center gap-3 mb-8 text-right justify-start">
              <div className="w-10 h-10 bg-[#3198c1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#3198c1]/20">
                <Info size={20}/>
              </div>
              <div>
                <h2 className="text-xl font-black">تفاصيل البيع الفعلي</h2>
                {selectedSizeVariant && (
                  <p className="text-xs text-slate-400 mt-1 font-bold">المختار: {selectedSizeVariant.sku} ({selectedSizeVariant.size})</p>
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
                LabelTitle={"سعر البيع الفعلي (للقطعة)"}
                type="number"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 font-black text-right"
                value={saleDetails.sold_at_price}
                onChange={(e) => setSaleDetails({...saleDetails, sold_at_price: e.target.value})}
              />
              
              <MyInput
                LabelTitle={"الكمية المطلوبة"}
                type="number"
                className="bg-white/5 border-white/10 text-white font-black text-right"
                value={saleDetails.quantity}
                onChange={(e) => setSaleDetails({...saleDetails, quantity: e.target.value})}
              />

              <div className="flex flex-col gap-2 text-right">
                <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-wider">ملاحظات البند</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1]/50 transition-all min-h-[100px] text-right text-white placeholder:text-slate-600"
                  placeholder="ملاحظات حول هذا الصنف بالتحديد..."
                  value={saleDetails.item_notes}
                  onChange={(e) => setSaleDetails({...saleDetails, item_notes: e.target.value})}
                />
              </div>

              <MyButton
                title="إضافة للفاتورة الحالية"
                onClick={handleConfirmAddition}
                className="w-full py-5 bg-[#3198c1] hover:bg-[#2a84a8] text-white rounded-2xl shadow-xl font-black transition-all active:scale-[0.98]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;