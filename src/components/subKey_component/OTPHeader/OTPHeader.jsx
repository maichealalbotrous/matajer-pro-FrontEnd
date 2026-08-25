import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OTPHeader = function () {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center">
      {' '}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[#050b1a] rounded-[28px] flex items-center justify-center shadow-2xl shadow-[#050b1a]/20 text-white">
          <ShieldCheck size={40} className="text-[#3198c1]" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-[#0f172a]">رمز التحقق</h1>

        <div className="space-y-2 px-4">
          {/* النص الرئيسي */}
          <p className="text-slate-500 font-bold text-sm sm:text-base leading-relaxed">
            أدخل الرمز المكون من{' '}
            <span className="text-slate-900 font-[900]">8 أرقام وحروف</span>{' '}
            المرسل إليك
          </p>

          {/* صندوق رقم التواصل */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-400">
            <span>في حال عدم امتلاك رمز . يرجى التواصل على الرقم:</span>
            <a
              href="tel:+963930942741"
              dir="ltr"
              className="text-blue-600 hover:text-blue-700 underline font-extrabold tracking-wide"
            >
              +963 930 942 741
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => navigate('/Auth')}
          className="text-sm cursor-pointer font-black text-slate-400 hover:text-[#3198c1] transition-colors"
        >
          تغيير البريد أو الرقم؟
        </button>
      </div>
    </div>
  );
};

export default OTPHeader;
