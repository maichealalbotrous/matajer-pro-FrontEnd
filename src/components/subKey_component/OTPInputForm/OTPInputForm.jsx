import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const OTPInputForm = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 w-full overflow-hidden" dir="ltr">
      <div className="flex items-center gap-2 mb-4">
         <span className="text-lg sm:text-2xl font-[900] text-slate-300 tracking-widest">SAND</span>
      </div>

      <InputOTP 
        maxLength={8} // تم تعديلها إلى 8 مطابقة لعدد الخانات الفعلية
        value={value}
        onChange={onChange}
        className="w-full"
         type="text"
        inputMode="text"
        pattern="^[a-zA-Z0-9]*$"
      >
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          
          {/* section one  */}
          <InputOTPGroup className="gap-1 sm:gap-2">
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot 
                key={index}
                index={index} 
                className="w-8 h-12 xs:w-9 xs:h-14 sm:w-11 sm:h-16 text-lg sm:text-2xl font-[900] rounded-lg sm:rounded-xl border-2 border-slate-100 bg-white shadow-sm transition-all focus:border-[#0f172a]" 
              />
            ))}
          </InputOTPGroup>
          
          <InputOTPSeparator className="hidden xs:block text-slate-400 font-bold mx-0.5 sm:mx-1" />
          
          {/* section two */}
          <InputOTPGroup className="gap-1 sm:gap-2">
            {[4, 5, 6, 7].map((index) => (
              <InputOTPSlot 
                key={index}
                index={index} 
                className="w-8 h-12 xs:w-9 xs:h-14 sm:w-11 sm:h-16 text-lg sm:text-2xl font-[900] rounded-lg sm:rounded-xl border-2 border-slate-100 bg-white shadow-sm transition-all focus:border-[#0f172a]" 
              />
            ))}
          </InputOTPGroup>

        </div>
      </InputOTP>
      
      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-4 text-center">
        أدخل رمز التفعيل المكون من 8 أرقام وحروف
      </p>
    </div>
  );
};

export default OTPInputForm;