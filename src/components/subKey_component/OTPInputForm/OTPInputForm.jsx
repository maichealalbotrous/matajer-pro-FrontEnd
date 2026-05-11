import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const OTPInputForm = ({ value, onChange }) => {
  return (
    <div className="flex justify-center py-4" dir="ltr">
      <InputOTP 
        maxLength={6} 
        value={value}
        onChange={onChange}
      >
        <InputOTPGroup className="gap-3">
          <InputOTPSlot index={0} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
          <InputOTPSlot index={1} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
          <InputOTPSlot index={2} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
        </InputOTPGroup>
        
        <InputOTPSeparator className="text-slate-300" />
        
        <InputOTPGroup className="gap-3">
          <InputOTPSlot index={3} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
          <InputOTPSlot index={4} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
          <InputOTPSlot index={5} className="w-12 h-16 text-2xl font-black rounded-2xl border-2 border-slate-100 focus:border-[#3198c1] bg-slate-50/50" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default OTPInputForm;