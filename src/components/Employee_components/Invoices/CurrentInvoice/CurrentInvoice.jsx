import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import InvoiceItem from '../InvoiceItem/InvoiceItem';
import InvoiceSummary from '../InvoiceSummary/InvoiceSummary';



const CurrentInvoice = ({ cartItems, setCartItems }) => {
  const [invoiceType, setInvoiceType] = useState('sale');
  const [notes, setNotes] = useState('');
  const [originalInvoiceId, setOriginalInvoiceId] = useState('');

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.quantity * item.sold_at_price), 0);

  const removeItem = (index) => {
    setCartItems(cartItems.filter((i) => i !== index));
  };

  const handleSubmit = async () => {
    if (cartItems.length === 0) return alert("الفاتورة فارغة!");
    
  


  };

  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* اليمنى: القائمة */}
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-3xl font-black text-[#0f172a] text-right">الفاتورة الحالية</h1>
          
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <InvoiceItem key={index} item={item} index={index} onRemove={removeItem} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
              <FileText size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold">السلة فارغة</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <InvoiceSummary 
            invoiceType={invoiceType}
            setInvoiceType={setInvoiceType}
            originalInvoiceId={originalInvoiceId}
            setOriginalInvoiceId={setOriginalInvoiceId}
            notes={notes}
            setNotes={setNotes}
            totalAmount={totalAmount}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentInvoice;