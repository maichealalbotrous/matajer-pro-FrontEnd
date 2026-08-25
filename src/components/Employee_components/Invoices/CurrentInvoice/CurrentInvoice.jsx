import React, { useState, useEffect } from 'react';
import { FileText, ArrowLeftRight, ShoppingBag, RotateCcw } from 'lucide-react';
import InvoiceItem from '../InvoiceItem/InvoiceItem';
import InvoiceSummary from '../Invoices_Summary/InvoiceSummary/InvoiceSummary';
import SuccessAlert from '@/components/SuccessAlert/SuccessAlert';
import { storeInvoiceServer, returnInvoiceServer, exchangeInvoiceServer } from '../../Products/ProductVariants/lib';

const CurrentInvoice = ({ cartItems, setCartItems }) => {
  const [invoiceType, setInvoiceType] = useState('sale');
  const [notes, setNotes] = useState('');
  const [originalInvoiceId, setOriginalInvoiceId] = useState('');
  
  //the returned Item state
  const [returnedItems, setReturnedItems] = useState([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // totalNewAmount_Price
  const totalNewAmount = cartItems.reduce((acc, item) => acc + (item.quantity * item.sold_at_price), 0);
  
  // totalReturnedAmount_price
  const totalReturnedAmount = returnedItems.reduce((acc, item) => acc + (item.quantity * item.sold_at_price), 0);

  // netExchangeAmount
  const netExchangeAmount = totalNewAmount - totalReturnedAmount;

  useEffect(() => {
    const session = localStorage.getItem('active_exchange_session');
    if (session) {
      const parsedSession = JSON.parse(session);
      setInvoiceType('exchange');
      setOriginalInvoiceId(parsedSession.original_invoice_id);

      setReturnedItems(parsedSession.returned_items || []);
      
    }
  }, []);

  // remove item from cart (for sale and return invoices)
  const removeItem = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  //remove item from cart (for sale and return invoices)
  const removeNewItem = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  // removeReturnedItem
  const removeReturnedItem = (indexToRemove) => {
    setReturnedItems(returnedItems.filter((_, index) => index !== indexToRemove));
  };


  const handleSubmit = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (invoiceType === 'sale') {
        if (cartItems.length === 0) throw new Error("الفاتورة فارغة! يرجى إضافة أصناف أولاً.");
        
        const payload = {
          notes: notes || "فاتورة مبيعات مباشرة",
          items: cartItems.map(item => ({
            variant_id: Number(item.variant_id),
            quantity: Number(item.quantity),
            sold_at_price: Number(item.sold_at_price),
            item_notes: item.item_notes || null
          }))
        };
        await storeInvoiceServer(payload);

      } else if (invoiceType === 'return') {
        if (!originalInvoiceId) throw new Error("حقل رقم الفاتورة الأصلية مطلوب لإتمام مستند المرتجع.");
        if (cartItems.length === 0) throw new Error("يرجى إضافة الأصناف المراد إرجاعها للسلة أولاً.");

        const payload = {
          original_invoice_id: Number(originalInvoiceId),
          items: cartItems.map(item => ({
            variant_id: Number(item.variant_id),
            quantity: Number(item.quantity)
          }))
        };
        await returnInvoiceServer(payload);

      } else if (invoiceType === 'exchange') {
        if (!originalInvoiceId) throw new Error("حقل رقم الفاتورة الأصلية مطلوب لعمليات الاستبدال.");
        if (returnedItems.length === 0) throw new Error("يجب أن تحتوي قائمة المرتجعات على صنف واحد على الأقل.");
        if (cartItems.length === 0) throw new Error("يرجى إضافة الأصناف البديلة الجديدة إلى السلة أولاً.");

        const payload = {
          original_invoice_id: Number(originalInvoiceId),
          returned_items: returnedItems.map(item => ({
            variant_id: Number(item.variant_id),
            quantity: Number(item.quantity)
          })),
          new_items: cartItems.map(item => ({
            variant_id: Number(item.variant_id),
            quantity: Number(item.quantity),
            sold_at_price: Number(item.sold_at_price)
          }))
        };

        await exchangeInvoiceServer(payload);
        
        //delete the active_exchange_session in local storage
        localStorage.removeItem('active_exchange_session');
      }

      setCartItems([]);
      setReturnedItems([]);
      setNotes('');
      setOriginalInvoiceId('');


    } catch (error) {
      console.error("خطأ معالجة السيرفر:", error);
      setErrorMessage(error.message || error.error || "فشلت العملية. تحقق من المدخلات.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-[#fcfcfc] min-h-screen pb-32" dir="rtl">
      <SuccessAlert isVisible={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/*table of invoice items*/}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] text-right">
              {invoiceType === 'exchange' ? 'معالجة طلب استبدال مقاصي' : 'الفاتورة الحالية'}
            </h1>
            {invoiceType === 'exchange' && (
              <span className="self-start sm:self-auto px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-black text-xs flex items-center gap-1">
                <ArrowLeftRight size={12} /> ربط بالفاتورة #{originalInvoiceId}
              </span>
            )}
          </div>
          
          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-2xl text-right animate-in fade-in">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* exchange state*/}
          {invoiceType === 'exchange' ? (
            <div className="space-y-6">
              
              <div className="space-y-3">
                <h3 className="text-xs font-black text-red-500 mr-2 flex items-center gap-1">
                  <RotateCcw size={14} /> 1. البضاعة المسترجعة من الزبون (سيتم إعادتها للمخزن)
                </h3>
                {returnedItems.length > 0 ? (
                  <div className="space-y-3 divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                    {returnedItems.map((item, index) => (
                      <div key={`ret-${index}`} className="pt-3 first:pt-0">
                        <InvoiceItem item={item} index={index} onRemove={removeReturnedItem} isReturnStyle={true} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-slate-400 text-sm font-bold">لا يوجد أصناف مسترجعة.</p>
                  </div>
                )}
              </div>

              {/*New Exchange Item */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-green-600 mr-2 flex items-center gap-1">
                  <ShoppingBag size={14} /> 2. البضاعة البديلة الجديدة (المضافة من شاشة المنتجات)
                </h3>
                {cartItems.length > 0 ? (
                  <div className="space-y-3 divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                    {cartItems.map((item, index) => (
                      <div key={`new-${index}`} className="pt-3 first:pt-0">
                        <InvoiceItem item={item} index={index} onRemove={removeNewItem} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                    <FileText size={32} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-slate-400 font-bold text-sm">قم باختيار الموديلات الجديدة البديلة من قائمة المنتجات</p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            cartItems.length > 0 ? (
              <div className="space-y-3 divide-y divide-slate-100 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                {cartItems.map((item, index) => (
                  <div key={index} className="pt-3 first:pt-0">
                    <InvoiceItem item={item} index={index} onRemove={removeItem} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px]">
                <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold">السلة فارغة</p>
              </div>
            )
          )}
        </div>

        {/* invoice summary detailes*/}
        <div className="lg:col-span-4">
          <InvoiceSummary 
            invoiceType={invoiceType}
            setInvoiceType={(type) => {
              setInvoiceType(type);
              setErrorMessage("");
              if (type !== 'exchange') setReturnedItems([]);
            }}
            originalInvoiceId={originalInvoiceId}
            setOriginalInvoiceId={setOriginalInvoiceId}
            notes={notes}
            setNotes={setNotes}
            totalAmount={invoiceType === 'exchange' ? netExchangeAmount : totalNewAmount}
            onSubmit={handleSubmit}
            disabled={isLoading}
            isExchangeMode={invoiceType === 'exchange'}
            exchangeDetails={{
              totalNew: totalNewAmount,
              totalReturned: totalReturnedAmount
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentInvoice;