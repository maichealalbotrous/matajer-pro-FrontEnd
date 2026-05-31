import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

function InvoicesCard({ invoices = [] }) {
  return (
    <Link to="/Invoices" className="block bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 w-full hover:shadow-md transition-all" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-[#0f172a]">الفواتير المعتمدة</h3>
        <span className="bg-blue-50 text-[#3198c1] px-3 py-1 rounded-full text-[10px] font-black">آخر ساعة</span>
      </div>
      <div className="space-y-6">
        {invoices.map((inv, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><FileText size={20} /></div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#0f172a] uppercase"><span className=' text-center me-2'>رقم الفاتورة</span>({inv.id})</span>
                <span className="text-[10px] font-bold text-slate-400">{inv.invoice_date} - {inv.branch}</span>
              </div>
            </div>
            <div className="text-left font-black text-[#0f172a]">{inv.total_amount} <span className="text-[10px] text-slate-400 mr-1">ل.س</span></div>
          </div>
        ))}
      </div>
    </Link>
  );
}
export default InvoicesCard;