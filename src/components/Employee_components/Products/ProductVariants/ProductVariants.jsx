import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';


const ProductVariants = ({ addToInvoice }) => {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const variants = [
    { Product_id: 1, id: 10, color: 'أسود مطفي', size: '256GB', price: 4500 },
    { Product_id: 1, id: 12, color: 'أبيض لؤلؤي', size: '128GB', price: 4200 },
    { Product_id: 2, id: 11, color: 'تيتانيوم طبيعي', size: '512GB', price: 5200 },
  ];

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [saleDetails, setSaleDetails] = useState({
    quantity: 1,
    sold_at_price: '',
    item_notes: ''
  });

  const filteredVariants = variants.filter(v => v.Product_id === Number(productId));

  const handleConfirmAddition = () => {
    if (!selectedVariant || !saleDetails.sold_at_price) {
      alert('يرجى اختيار موديل وتحديد سعر البيع الفعلي قبل الإضافة للفاتورة.');
      return;
    }

    const newItem = {
      variant_id: selectedVariant.id,
      model_name: selectedVariant.color,
      quantity: parseInt(saleDetails.quantity),
      sold_at_price: parseFloat(saleDetails.sold_at_price),
      item_notes: saleDetails.item_notes
    };

    addToInvoice(newItem); 

    setSaleDetails({
      quantity: 1,
      sold_at_price: '',
      item_notes: ''
    });
    setSelectedVariant(null);

    setShowSuccessAlert(true);
    
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  return (
    <div className="p-10 bg-[#fcfcfc] min-h-screen" dir="rtl">
      
      {/* SuccessAlert*/}
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
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">تخصيص البيع</h1>
          <p className="text-slate-400 font-bold">المنتج الحالي: {productId} #</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* products variants section*/}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-lg font-black text-slate-500 mr-2">الموديلات المتوفرة في المخزن</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVariants.length > 0 ? (
              filteredVariants.map((v) => (
                <div 
                  key={v.id}
                  onClick={() => {
                    setSelectedVariant(v);
                    setSaleDetails({...saleDetails, sold_at_price: v.price});
                  }}
                  className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col justify-between h-40 
                    ${selectedVariant?.id === v.id 
                      ? 'border-[#3198c1] bg-blue-50/30' 
                      : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-black text-xl text-[#0f172a]">{v.color}</span>
                    <div className="bg-slate-100 px-3 py-1 rounded-lg text-[10px] font-black text-slate-500">
                      {v.size}
                    </div>
                  </div>
                  <div className="text-slate-400 font-bold">السعر المرجعي: {v.price.toLocaleString()} ل.س</div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400 font-bold bg-white rounded-[40px] border border-dashed border-slate-200">
                لا توجد موديلات متاحة لهذا المنتج حالياً في هذا الفرع
              </div>
            )}
          </div>
        </div>

        {/* Sale Details Section */}
        <div className="lg:col-span-5">
          <div className="bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-10 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#3198c1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#3198c1]/20">
                <Info size={20}/>
              </div>
              <h2 className="text-xl font-black">تفاصيل العملية</h2>
            </div>

            <div className="space-y-6">
              {/* product price */}
              <MyInput 
                LabelTitle={"سعر البيع الفعلي (للقطعة)"} 
                type="number"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 font-black"
                value={saleDetails.sold_at_price}
                onChange={(e) => setSaleDetails({...saleDetails, sold_at_price: e.target.value})}
              />
              
              {/* quantity */}
              <MyInput 
                LabelTitle={"الكمية المطلوبة"} 
                type="number"
                className="bg-white/5 border-white/10 text-white font-black"
                value={saleDetails.quantity}
                onChange={(e) => setSaleDetails({...saleDetails, quantity: e.target.value})}
              />

              {/* notice */}
              <div className="flex flex-col gap-2 text-right">
                <label className="text-xs font-black text-slate-400 mr-2 uppercase tracking-wider">ملاحظات إضافية</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1]/50 transition-all min-h-[120px] text-right text-white placeholder:text-slate-600"
                  placeholder="مثال: خصم لعميل دائم، ضمان إضافي..."
                  value={saleDetails.item_notes}
                  onChange={(e) => setSaleDetails({...saleDetails, item_notes: e.target.value})}
                />
              </div>

              {/* add button*/}
              <MyButton 
                title="إضافة للفاتورة الحالية" 
                onClick={handleConfirmAddition}
                className="w-full py-5 bg-[#3198c1] hover:bg-[#2a84a8] text-white rounded-2xl shadow-xl shadow-[#3198c1]/10 font-black transition-all active:scale-[0.98]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;