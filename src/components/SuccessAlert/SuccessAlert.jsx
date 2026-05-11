import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '../ui/button';

const SuccessAlert = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 animate-in fade-in slide-in-from-bottom-4">
      
      <Alert className="max-w-md bg-[#050b1a] border-none text-white rounded-[24px] p-6 shadow-2xl">
        <div className="flex items-start gap-4 text-right" dir="rtl">
          <CheckCircle2Icon className="text-green-400 w-6 h-6 shrink-0 mt-1" />
          
          <div className="flex-1 flex flex-col"> {/* أضفنا flex-col هنا */}
            <AlertTitle className="font-black text-lg mb-1 leading-none">
              تمت الإضافة للفاتورة!
            </AlertTitle>
            
            <AlertDescription className="text-slate-400 font-bold text-sm">
              تم إدراج المنتج في القائمة بنجاح. هل تريد إنهاء الطلب الآن؟
            </AlertDescription>
            
            {/* التعديل هنا: justify-end لنقل الأزرار لليسار (النهاية في RTL) */}
            <div className="mt-6 flex gap-3 justify-end"> 
              <Button 
                size="sm" 
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 rounded-xl font-black px-5"
                onClick={onClose}
              >
                إضافة المزيد
              </Button>

              <Button 
                size="sm" 
                className="bg-[#3198c1] hover:bg-[#287da1] text-white rounded-xl font-black px-6 shadow-lg shadow-[#3198c1]/20"
                onClick={() => navigate('/CurrentInvoice')}
              >
                عرض الفاتورة
              </Button>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default SuccessAlert;