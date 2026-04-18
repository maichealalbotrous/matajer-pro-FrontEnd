import React, { useState } from 'react';

import { mockApiResponse } from './lib'; 
import InvoiceStats from '../InvoiceStats/InvoiceStats';
import InvoiceList from '../InvoiceList/InvoiceList';
import InvoiceDetailModal from '../InvoiceDetailModal/InvoiceDetailModal';
function InvoiceManager() {

  

  // 2. (States)
  const [invoices, SetInvoices] = useState(mockApiResponse.data);
  const [stats, SetStats] = useState(mockApiResponse.statistics);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. (Handlers)
  const handleViewInvoice = (id) => {
    const inv = invoices.find(item => item.id === id);
    setSelectedInvoice(inv);
    setIsModalOpen(true);
  };

  const handleApprove = (id) => {
    console.log("جاري اعتماد الفاتورة رقم:", id);

};

  const handleRevert = (id) => {
    console.log("جاري التراجع عن الفاتورة رقم:", id);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8" dir="rtl">
      
      {/* InvoiceStats*/}
      <InvoiceStats stats={stats} />

      <div className="space-y-4">
         {/* <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-[#0f172a]">قائمة الفواتير الأخيرة</h2>
          <div className="flex gap-2">
         {هنا يمكن إضافة فلاتر مستقبلاً}
          </div>
        </div>  */}

        {/* InvoiceList*/}
        <InvoiceList
          invoices={invoices} 
          onView={handleViewInvoice} 
          onApprove={handleApprove} 
          onRevert={handleRevert} 
        />
      </div>

      {/* InvoiceDetailModal*/}
        <InvoiceDetailModal 
        invoice={selectedInvoice} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        />
    </div>
  );
}

export default InvoiceManager;