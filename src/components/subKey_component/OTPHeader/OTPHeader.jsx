import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OTPHeader = function() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center">      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#050b1a] rounded-[28px] flex items-center justify-center shadow-2xl shadow-[#050b1a]/20 text-white">
          <ShieldCheck size={40} className="text-[#3198c1]" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#0f172a]">رمز التحقق</h1>
        <p className="text-slate-400 font-bold px-4 text-sm">
          أدخل الرمز المكون من 6 أرقام المرسل إليك

      (في حال عدم امتلاك كود يرجى التواصل على الرقم (+963930942741)  )
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button 
          onClick={() => navigate("/Auth")} 
          className="text-sm cursor-pointer font-black text-slate-400 hover:text-[#3198c1] transition-colors"
        >
          تغيير البريد أو الرقم؟
        </button>  
      </div>
    </div>
  );
}

export default OTPHeader;