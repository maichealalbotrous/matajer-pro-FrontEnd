import React, { useState } from 'react';
import { mockApiResponse } from './lib'; 
import InvoiceStats from '../InvoiceStats/InvoiceStats';
import InvoiceList from '../InvoiceList/InvoiceList';
import InvoiceDetailModal from '../InvoiceDetailModal/InvoiceDetailModal';

function InvoiceManager() {
  // 1. (States) - تم الاحتفاظ بنفس المنطق
  const [invoices, SetInvoices] = useState(mockApiResponse.data);
  const [stats, SetStats] = useState(mockApiResponse.statistics);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. (Handlers)
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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8" dir="rtl">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الفواتير</h1>
          <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
            متابعة واعتماد الفواتير الصادرة من الفروع
          </p>
        </div>
      </div>

      <div className="w-full">
        <InvoiceStats stats={stats} />
      </div>

      <div className="w-full">
        <InvoiceList
          invoices={invoices} 
          onView={handleViewInvoice} 
          onApprove={handleApprove} 
          onRevert={handleRevert} 
        />
      </div>

      <InvoiceDetailModal 
        invoice={selectedInvoice} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default InvoiceManager;