import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function InvoiceList({ invoices = [], onView, onApprove, onRevert }) {
  // 💡 حالات الترقيم والتحكم بالصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const INVOICES_PER_PAGE = 5; // عدد الفواتير في الصفحة الواحدة

  // عند تغير مصفوفة الفواتير القادمة من الخارج، نعود تلقائياً للصفحة الأولى
  useEffect(() => {
    setCurrentPage(1);
  }, [invoices]);

  // 💡 حسابات الترقيم وتحديد الفواتير المعروضة بالصفحة الحالية فقط
  const totalInvoices = invoices || [];
  const indexOfLastInvoice = currentPage * INVOICES_PER_PAGE;
  const indexOfFirstInvoice = indexOfLastInvoice - INVOICES_PER_PAGE;
  const currentInvoicesSlice = totalInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(totalInvoices.length / INVOICES_PER_PAGE);

  const Actions = ({ inv, onView, onApprove, onRevert }) => (
    <div className="flex justify-center gap-2">
      <button 
        onClick={() => onView(inv.id)} 
        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-[#0f172a] hover:text-white transition-all"
        title="عرض التفاصيل"
      >
        <Eye size={18} />
      </button>
      {inv.status === 'pending' ? (
        <button 
          onClick={() => onApprove(inv.id)} 
          className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
          title="اعتماد"
        >
          <CheckCircle size={18} />
        </button>
      ) : (
        <button 
          onClick={() => onRevert(inv.id)} 
          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
          title="إلغاء الاعتماد"
        >
          <RotateCcw size={18} />
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4" dir="rtl">
      
      {/* عرض الجدول للشاشات الكبيرة */}
      {totalInvoices.length > 0 && (
        <div className="hidden md:block bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="p-6 text-right">رقم الفاتورة</TableHead>
                <TableHead className="p-6 text-right">الموظف</TableHead>
                <TableHead className="p-6 text-right">المبلغ</TableHead>
                <TableHead className="p-6 text-right">الحالة</TableHead>
                <TableHead className="p-6 text-right">التاريخ</TableHead>
                <TableHead className="p-6 text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoicesSlice.map((inv) => (
                <TableRow key={inv.id} className="border-slate-50 hover:bg-slate-50/30">
                  <TableCell className="p-6 font-black">#{inv.id}</TableCell>
                  <TableCell className="p-6 text-sm font-bold text-slate-600">{inv.user?.name}</TableCell>
                  <TableCell className="p-6 font-black">{parseFloat(inv.total_amount || 0).toLocaleString()} ل.س</TableCell>
                  <TableCell className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${inv.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      {inv.status === 'approved' ? 'معتمدة' : 'عالقة'}
                    </span>
                  </TableCell>
                  <TableCell className="p-6 text-xs font-bold text-slate-400">{inv.invoice_date}</TableCell>
                  <TableCell className="p-6">
                    <Actions inv={inv} onView={onView} onApprove={onApprove} onRevert={onRevert} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* عرض الكروت الهواتف المحمولة */}
      {totalInvoices.length > 0 && (
        <div className="md:hidden space-y-4">
          {currentInvoicesSlice.map((inv) => (
            <div key={inv.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center font-black">
                <span>#{inv.id}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${inv.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {inv.status === 'approved' ? 'معتمدة' : 'عالقة'}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-600">{inv.user?.name}</div>
              <div className="font-black">{parseFloat(inv.total_amount || 0).toLocaleString()} ل.س</div>
              <div className="border-t pt-3 flex justify-between items-center border-slate-100">
                <span className="text-xs text-slate-400">{inv.invoice_date}</span>
                <Actions inv={inv} onView={onView} onApprove={onApprove} onRevert={onRevert} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* حالة عدم وجود فواتير */}
      {totalInvoices.length === 0 && (
        <div className="p-16 text-center bg-white rounded-[32px] border border-dashed border-slate-200 text-slate-400 font-bold text-sm">
          لا توجد فواتير معروضة حالياً
        </div>
      )}

      {/* 💡 بار الترقيم (Pagination) السفلي المتراص والمحاذى بشكل فاخر */}
      {totalInvoices.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 select-none">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const pageNumber = pageIdx + 1;
              const isSelected = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-9 h-9 text-xs font-black rounded-lg transition-all ${
                    isSelected 
                      ? 'bg-[#3198c1] text-white shadow-sm shadow-[#3198c1]/25' 
                      : 'text-slate-500 hover:bg-white hover:text-[#0f172a]'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;