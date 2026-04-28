import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const ProductVariants = ({ addToInvoice }) => {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  
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
      alert("يرجى اختيار الموديل وتحديد سعر البيع");
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
    alert("تمت الإضافة للفاتورة بنجاح");
    navigate('/CurrentInvoice');
  };

  return (
    <div className="p-10 bg-[#fcfcfc] min-h-screen" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-[20px] shadow-sm hover:bg-slate-50 transition-all">
          <ChevronRight size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">تخصيص البيع</h1>
          <p className="text-slate-400 font-bold">المنتج: {productId} #</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                  className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col justify-between h-40 ${selectedVariant?.id === v.id ? 'border-[#3198c1] bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-black text-xl text-[#0f172a]">{v.color}</span>
                    <div className="bg-slate-100 px-3 py-1 rounded-lg text-[10px] font-black text-slate-500">{v.size}</div>
                  </div>
                  <div className="text-slate-400 font-bold">السعر المرجعي: {v.price} ل.س</div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-400 font-bold bg-white rounded-3xl border border-dashed">
                لا توجد موديلات متاحة لهذا المنتج حالياً
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#3198c1] rounded-xl flex items-center justify-center"><Info size={20}/></div>
              <h2 className="text-xl font-black text-right w-full">تفاصيل العملية</h2>
            </div>

            <div className="space-y-6 ">
              <MyInput 
                LabelTitle={"سعر البيع الفعلي (يدوي)"} 
                type="number"
                className="bg-white/5 border-white/10 text-white"
                value={saleDetails.sold_at_price}
                onChange={(e) => setSaleDetails({...saleDetails, sold_at_price: e.target.value})}
              />
              
              <MyInput 
                LabelTitle={"الكمية المطلوبة"} 
                type="number"
                className="bg-white/5 border-white/10 text-white"
                value={saleDetails.quantity}
                onChange={(e) => setSaleDetails({...saleDetails, quantity: e.target.value})}
              />

              <div className="flex flex-col gap-2 text-right">
                <label className="text-xs font-black text-slate-400 mr-2">ملاحظات إضافية</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] transition-all min-h-[100px] text-right"
                  placeholder="خصم خاص، حالة المنتج، الخ..."
                  value={saleDetails.item_notes}
                  onChange={(e) => setSaleDetails({...saleDetails, item_notes: e.target.value})}
                />
              </div>

              <MyButton 
                title="إضافة للفاتورة الحالية" 
                onClick={handleConfirmAddition}
                className="w-full py-5 bg-[#3198c1] hover:bg-[#2a84a8] transition-colors mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;